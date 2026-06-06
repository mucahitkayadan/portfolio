import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const models = [
  'public/desktop_pc/scene.gltf',
  'public/planet/scene.gltf',
];

const run = (command) => {
  execSync(command, { cwd: root, stdio: 'inherit' });
};

for (const modelPath of models) {
  const absoluteModel = join(root, modelPath);
  if (!existsSync(absoluteModel)) {
    console.warn(`Skipping missing model: ${modelPath}`);
    continue;
  }

  const modelDir = dirname(absoluteModel);
  const backupDir = join(modelDir, '_backup');
  const tempOutput = join(modelDir, 'scene.optimized.gltf');

  console.log(`\nOptimizing ${modelPath}...`);

  mkdirSync(backupDir, { recursive: true });
  cpSync(absoluteModel, join(backupDir, 'scene.gltf'), { force: true });

  const binPath = join(modelDir, 'scene.bin');
  if (existsSync(binPath)) {
    cpSync(binPath, join(backupDir, 'scene.bin'), { force: true });
  }

  run(
    `npx gltf-transform optimize "${absoluteModel}" "${tempOutput}" --compress draco --texture-size 1024`
  );

  rmSync(absoluteModel, { force: true });
  cpSync(tempOutput, absoluteModel, { force: true });
  rmSync(tempOutput, { force: true });

  console.log(`Optimized ${modelPath} (backup in ${backupDir})`);
}

console.log('\nModel optimization complete.');

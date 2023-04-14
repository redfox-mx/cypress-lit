import { globSync } from 'glob';
import { copyFile } from 'fs/promises';
import { basename, join } from 'path';

const sourceFiles = [ ...globSync('dist/src/**/*.js') ];
const typesFiles = [ 'src/types.d.ts', ...globSync('dist/src/**/*.d.ts') ];
const packageFiles = [ 'package.json', 'README.md', 'LICENSE' ]

function copy(oldPath, newPah) {
  return copyFile(oldPath, newPah);
}

function file2dist(file) {
  const distDir = 'dist/';
  return copy(file, join(distDir, basename(file)))
}

Promise.all([
  sourceFiles,
  typesFiles,
  packageFiles,
]
.flat()
.map(file => file2dist(file))
);



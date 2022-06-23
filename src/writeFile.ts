import { createWriteStream, mkdir } from "node:fs";
import { dirname } from "node:path";
type BarrelFileOptions = {
  path: string;
  /**
   * Component name
   */
  exportFrom: string;
};

const writeBarrelFile = (opts: BarrelFileOptions) => {
  const parentFolder = opts.path.includes(".") ? dirname(opts.path) : opts.path;

  mkdir(`${parentFolder}/${opts.exportFrom}`, () => {
    const newDir = parentFolder + "/" + opts.exportFrom;

    const barrelWriteStream = createWriteStream(`${newDir}/index.ts`);
    const componentWriteStream = createWriteStream(
      `${newDir}/${opts.exportFrom}.tsx`
    );

    const barrelFile = `export * from './${opts.exportFrom}';`;
    barrelWriteStream.write(barrelFile);
    const compFile = `import React from 'react';\nimport { css } from '@emotion/css';\n\nconst ${opts.exportFrom} = () => {\n\treturn <h1>Hello!</h1>;\n}\n\nexport { ${opts.exportFrom}};\n`;
    componentWriteStream.write(compFile);
  });
};

export { writeBarrelFile };

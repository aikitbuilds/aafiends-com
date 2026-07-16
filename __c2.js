const ts=require("./node_modules/typescript"); const fs=require("fs");
const f="src/app/90-r-and-r/page.tsx";
const sf=ts.createSourceFile(f,fs.readFileSync(f,"utf8"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const d=sf.parseDiagnostics||[]; console.log((d.length?"FAIL":"OK  ")+" ("+d.length+")  "+f);
console.log("imports AlphaClassDay:", fs.readFileSync(f,"utf8").includes("import AlphaClassDay"));
console.log("renders <AlphaClassDay/>:", fs.readFileSync(f,"utf8").includes("<AlphaClassDay />"));

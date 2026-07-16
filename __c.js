const ts=require("./node_modules/typescript"); const fs=require("fs");
for (const f of ["src/components/rr/AlphaClassDay.tsx","src/app/prep90/page.tsx"]){
  const sf=ts.createSourceFile(f,fs.readFileSync(f,"utf8"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const d=sf.parseDiagnostics||[]; console.log((d.length?"FAIL":"OK  ")+" ("+d.length+")  "+f);
}

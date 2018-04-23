// // crawlRepo
// // XXX break out into a named function rather than anon
// .then(() => {
//   async.each(Object.keys(tfTypesMap), tfType => {
//     let providerTypeDir = `${providerDir}/website/docs/${tfType}`;
//     let resourceType = tfTypesMap[tfType];
//     // store a global count/state of markdown files left to process per provider?
//     // count it down once snippet has been written.
//     var snippetObject = new snippetClass(
//       provider,
//       resourceType,
//       providerTypeDir
//     );
//     let stats = fs.statSync(providerTypeDir);
//     if (stats.isDirectory()) {
//       iterateOnFilesFunc(snippetObject, generateSnippet);
//     }
//   });
// });

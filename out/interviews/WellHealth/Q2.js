// Given a string and a desired chunk length, split the string into chunks of size <= length, prioritizing splitting on spaces if possible.
//  todo: review logic, test cases, is it most optimal?
// function chunkString1(str, len) {
//     let chunkArray = [];
//     let tokens = [];
//     let spaceSepTokens = str.split(" ");
//     spaceSepTokens.forEach(token => {
//         if (token.length > len) {
//             for (let i = 0; i < token.length; i += len) {
//                 tokens.push(token.slice(i, i+len));
//             }
//         }
//         else {
//             tokens.push(token);
//         }
//     })
//     let curChunk = [];
//     for (let i = 0; i < tokens.length; i++) {
//       let curToken = tokens[i];
//       let prvStr = curChunk.join(" ");
//       curChunk.push(curToken)
//       let curStr = curChunk.join(" ");
//       if (len < curStr.length) {
//         chunkArray.push(prvStr);
//         curChunk = [];
//         curChunk.push(curToken);
//       }
//     }
//     if (curChunk.length > 0) {
//       let str = curChunk.join(" ");
//       chunkArray.push(str); 
//     }
//     return chunkArray;
// }
// function chunkString(str, len) {
//     let chunkArray = [];
//     let tokens = str.split(" ");
//     let curChunk = [];
//     for (let i = 0; i < tokens.length; i++) {
//       let curToken = tokens[i];
//       let prvStr = curChunk.join(" ");
//       curChunk.push(curToken)
//       let curStr = curChunk.join(" ");
//       if (len < curStr.length) {
//         chunkArray.push(prvStr);
//         curChunk = [];
//         curChunk.push(curToken);
//       }
//     }
//     if (curChunk.length > 0) {
//       let str = curChunk.join(" ");
//       chunkArray.push(str); 
//     }
//     return chunkArray;
//   }
//   /**
//   test1:
//   "...above_len...  end"  // just break up it up without space
//   test2: 
//     // Empty string
//   */
//   // console.log(chunkString('i incomplete', 3)); 
//   // // ['i i','nco','mpl',..]
//   // console.log(chunkString('i incomplete', 3)); 
//   // // ['i','inc','omp',..]
//   console.log(chunkString('123456789', 2)); 
//   // ['12','34','56','78','9']
//   console.log(chunkString("Here is a somewhat realistic example of this method being executed",9)); 
//   // [ 'Here is a','somewhat','realistic','example','of this','method','being','executed' ]
//   console.log(chunkString("a a a a a a a a a a a", 20)); 
//   // [ 'a a a a a a a a a a', 'a' ]
//   console.log(chunkString("Gracias por su visita a CMC. ¿Quieres ver los laboratorios o enviar un mensaje a tu médico? Regìstrese en nuestro Portal de Pacientes hoy! Llame al 111-222-3333 ", 160)); 
//   // [ 'Gracias por su visita a CMC. ¿Quieres ver los laboratorios o enviar un mensaje a tu médico? Regìstrese en nuestro Portal de Pacientes hoy! Llame al 111-222-3333' ]
//   //     curChunk.push(tokens[i]);
//   //     let curStr = curChunk.join(" ");
//   //     if (curStr.length > len) {
//   //       chunkArray.push();
//   //     }
//   // //     //  adding extra token to chunk does not go past len limit
//   // //     if (charCount + tokenLen < len) {
//   // //       charCount += tokens[i].length;
//   // //     }
//   // //     //  break a token (stack)
//   // //     //  adding extra token would go past len limit
//   // //     else {
//   // //       let chunk = tokens.slice(startInd, i).join(" ");
//   // //       chunkArray.push(chunk);
//   // //       //  reset
//   // //       charCount = 0;
//   // //       startInd = i;
//   // //     }
//# sourceMappingURL=Q2.js.map
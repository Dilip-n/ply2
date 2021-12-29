// console.log("abc");
const nodemailer = require("nodemailer");
const fs = require("fs");
const excel = require("exceljs");

var xlsx = require("xlsx");

const filePath = __dirname + "/assets/DAS1.xlsx";
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const data = xlsx.utils.sheet_to_html(worksheet, {
  // header: "A",
  // range: 9,
});

console.log(data);

// if (
//   cellAsString[1] !== "r" &&
//   cellAsString[1] !== "m" &&
//   cellAsString[1] > 1
// ) {
//   if (cellAsString[0] === "A") {
//     post.title = worksheet[cell].v;
//   }
//   if (cellAsString[0] === "B") {
//     post.author = worksheet[cell].v;
//   }
//   if (cellAsString[0] === "C") {
//     post.released = worksheet[cell].v;
//     posts.push(post);
//     post = {};
//   }
// }
//   console.log(cell);
// }

// (async () => {
//   var transporter = nodemailer.createTransport({
//     host: "mail.hyperthinksys.com", //give your host name
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "notification@hyperthings.in",
//       pass: "Hw)8+WsG1ho&?SR-kY3",
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });

//   const date = new Date();
//   let info = await transporter.sendMail({
//     from: "dilip@hyperthings.in", // sender address
//     to: "dilip@hyperthings.in, nikhil@hyperthings.in", // list of receivers
//     subject: "Health Check Report", // Subject line
//     //text: "Mongo DB running at {port} on {server} is down.Please look into it.", // plain text body
//     html: `<p>Dear Team,</p>
//                    <p>Here is the ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} health check report of GCP application</p>
//                    <p>Thanks,</p>
//                    <p>Dilip</p>`,
//     // html body
//     attachments: [
//       {
//         filename: "DAS1.xlsx",
//         path: __dirname + "/assets/DAS1.xlsx",
//       },
//     ],
//   });
// })();

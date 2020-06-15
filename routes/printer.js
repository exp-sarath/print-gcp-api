var express = require('express');
var router = express.Router();

var CloudPrint = require('node-gcp');
// var fs = require('fs'); 
// const pdfreader = require('pdfreader');
let fs = require('fs'),
  PDFParser = require("pdf2json");

let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");

const puppeteer = require('puppeteer');
const handlebars = require("handlebars");


let pdfParser = new PDFParser();

router.get('/', async function (req, res, next) {
  // console.log('env:::', process.env);
  var printClient = new CloudPrint({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    accessToken: req.query.accessToken,
    refreshToken: req.query.refreshToken,
  });


  const printers = await printClient.getPrinters()
  res.send(printers);
});


router.post('/', async (req, res, next) => {
  var printClient = new CloudPrint({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    accessToken: req.query.accessToken,
    refreshToken: req.query.refreshToken,
  });

  console.log(__dirname);

  //create pdf from template method 1

  // const data = {
  //   title: "A new Brazilian School",
  //   date: "05/12/2018",
  //   name: "Rodolfo Luis Marcos",
  //   age: 28,
  //   birthdate: "12/07/1990",
  //   course: "Computer Science",
  //   obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
  // }

  // const pdfath = await createPDF(data);
  // fs.readFile(pdfPath, async (err, data) => {
  //   if (err)
  //     console.log('err:::::::::::::::', err);
  //   console.log('data::::::::::', data);

  //   await printClient.print(req.body.printerId, data, 'application/pdf');

  // })
  // console.log('done>>>>>>>>>>>>>>>>>');


    //create pdf from template method 2


  // ejs.renderFile(path.join(__dirname, './../public/views/', "report_template.ejs"), { date: req.body.date, name: req.body.name, items: req.body.items }, (err, data) => {
  //   console.log('data::::', data);
  //   if (err) {
  //     console.log('err1', err);
  //     res.send(err);
  //   } else {
  //     let options = {
  //       "height": "11.25in",
  //       "width": "8.5in",
  //       "header": {
  //         "height": "20mm"
  //       },
  //       "footer": {
  //         "height": "20mm",
  //       },
  //       "type": "pdf",             // allowed file types: png, jpeg, pdf
  //     };

      // pdf.create(data).toBuffer(async function (err, buffer) {
      //   console.log('This is a buffer:', buffer);
        // fs.writeFile('test.pdf', buffer, async function (err, data) {
        //   if (err)
        //     console.log('err:::::::::', err);
        //   console.log('data:::::::::', data);

        // })

        // await fs.readFile('/home/sarath/projects/print-gcp-api/test.pdf', async (err, data) => {
        //   if (err)
        //     console.log('err:::::::::::::::', err);
        //   console.log('data::::::::::>>>>>>>>>>>>>>>>', data);

        //   await printClient.print(req.body.printerId, data, 'application/pdf');

        // })
      //   await printClient.print(req.body.printerId, buffer, 'application/pdf');


      // });


      // pdf.create(data, options).toFile("report.pdf", function (err, data) {
      //   console.log('data2::222222>>>>>>>>>>>', data);
      //   if (err) {
      //     console.log('err2', err);
      //     res.send(err);
      //   } else {

      //     fs.readFile(data.filename, async (err, data) => {
      //       if (err)
      //         console.log('err:::::::::::::::', err);
      //       console.log('data::::::::::', data);

      //       await printClient.print(req.body.printerId, data, 'application/pdf');

      //     })
      //     res.send("File created successfully");
      //   }
      // });
  //   }
  // });


  fs.readFile('/home/sarath/projects/print-gcp-api/routes/sample.pdf', async (err, data) => {
    if (err)
      console.log('err:::::::::::::::', err);
    console.log('data::::::::::', data);

    await printClient.print(req.body.printerId, data, 'application/pdf');

  })

  // await printClient.print(req.body.printerId, item.text  , 'application/pdf');
  res.send('done');
});

// async function createPDF(data) {

//   console.log(process.cwd());
//   var templateHtml = fs.readFileSync(path.join(process.cwd(), './public/views/template2.html'), 'utf8');
//   console.log('template:::', templateHtml);
//   var template = handlebars.compile(templateHtml);
//   var html = template(data);

//   var milis = new Date();
//   milis = milis.getTime();

//   var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

//   var options = {
//     width: '1230px',
//     headerTemplate: "<p></p>",
//     footerTemplate: "<p></p>",
//     displayHeaderFooter: false,
//     margin: {
//       top: "10px",
//       bottom: "30px"
//     },
//     printBackground: true,
//     path: pdfPath
//   }

//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox'],
//     headless: true
//   });

//   var page = await browser.newPage();

//   await page.goto(`data:text/html;charset=UTF-8,${html}`, {
//     waitUntil: 'networkidle0'
//   });

//   await page.pdf(options);
//   await browser.close();
//   return pdfPath


// }
module.exports = router;

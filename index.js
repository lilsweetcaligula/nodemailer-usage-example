const Nodemailer = require('nodemailer')

// NOTE: The example is using the Gmail SMTP server.
//
async function main(argv) {
  const args = argv.slice(2)

  if (args.length < 1) {
    console.error('missing recipient option')
    return process.exit(1)
  }

  const [recipient_addr,] = args


  const host = 'smtp.gmail.com'
  const port = 587
  const user = fetchProp(process.env, 'SMTP_USER') // E.g.: 'elvis@gmail.com'
  const pass = fetchProp(process.env, 'SMTP_PASS') // E.g.: 'sekret'

  const transport = Nodemailer.createTransport({
    pool: true,
    secure: false, // <-- You might want to change that.
    host,
    port,
    auth: {
      user,
      pass
    }
  })


  const email = {
    to: recipient_addr,
    subject: 'Hello world!',
    text: 'Lorem ipsum dolor sit amet',
    html: '<html><body><h1>Lorem ipsum dolor sit amet</h1></body></html>'
  }


  await transport.sendMail(email)
}


main(process.argv)


function fetchProp(o, p) {
  if (p in o) {
    return o[p]
  }

  throw new Error(`missing prop: ${p}`)
}


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface Data {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
  })

  const mailData = {
    from: process.env.EMAIL,
    to: process.env.PERSONAL_EMAIL,
    subject: `Message From ${req.body.name} | Portfolio`,
    text: req.body.message + ' | Sent from: ' + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`,
  }

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      res.status(500).send(err)
    }

    res.status(200).send({ name: 'Success' })
  })
}

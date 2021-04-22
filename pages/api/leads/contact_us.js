import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const prep = (data) => ({
  firstName: data.firstName.toLowerCase().trim(),
  lastName: data.lastName.toLowerCase().trim(),
  email: data.email.toLowerCase().trim(),
  workPhone: data.workPhone,
  jobTitle: data.jobTitle.toLowerCase().trim(),
  organization: data.organization.toLowerCase().trim(),
  webSite: data.webSite.toLowerCase().trim(),
  orgSize: data.orgSize.toLowerCase().trim(),
  industry: data.industry.toLowerCase().trim(),
  leadSource: data.leadSource.toLowerCase().trim(),
  content: data.content.toLowerCase().trim(),
});

export default async (req, res) => {
  if (req.method === "POST") {
    const obj = prep(req.body);
    let exists;
    try {
      if (req.body.session) {
        exists = await prisma.user.findUnique({
          where: {
            id: req.body.session.user.id,
          },
        });
      } else {
        exists = await prisma.user.findUnique({
          where: {
            email: obj.email,
          },
        });
      }
    } catch (err) {
      exists = null;
    }
    try {
      let lead;
      if (exists) {
        lead = await prisma.leads.create({
          data: {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            workPhone: obj.workPhone,
            jobTitle: obj.jobTitle,
            organization: obj.organization,
            webSite: obj.webSite,
            orgSize: obj.orgSize,
            industry: obj.industry,
            leadSource: obj.leadSource,
            content: obj.content,
            User: {
              connect: { id: exists.id },
            },
          },
        });
      } else {
        lead = await prisma.leads.create({
          data: {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            workPhone: obj.workPhone,
            jobTitle: obj.jobTitle,
            organization: obj.organization,
            webSite: obj.webSite,
            orgSize: obj.orgSize,
            industry: obj.industry,
            leadSource: obj.leadSource,
            content: obj.content,
          },
        });
      }
      // if solutions
      if (req.body.solution && lead) {
        req.body.solution.map(async (d) => {
          await prisma.solution.create({
            data: {
              solution: d.toLowerCase().trim(),
              Leads: {
                connect: { id: lead.id },
              },
            },
          });
        });
      }
      // if subscribe
      if (req.body.subscribe) {
        if (exists) {
          await prisma.subscribe.create({
            data: {
              email: obj.email,
              active: true,
              User: {
                connect: { id: exists.id },
              },
            },
          });
        } else {
          await prisma.subscribe.create({
            data: {
              email: obj.email,
              active: true,
            },
          });
        }
      }
      res.status(200).send(lead);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: err.response.data.detail,
        data: err.response.data,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

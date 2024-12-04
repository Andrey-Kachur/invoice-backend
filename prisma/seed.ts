import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create an admin user
  const adminPassword = await bcrypt.hash('admin', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tempmail.com',
      password: adminPassword,
      name: 'root-admin'
    }
  })

  // Create 10 different invoices
  for (let i = 1; i <= 10; i++) {
    await prisma.invoice.create({
      data: {
        vendor_name: `Vendor ${i}`,
        amount: Math.random() * 1000,
        due_date: new Date(),
        description: `Description for invoice ${i}`,
        user_id: admin.id,
        paid: i % 2 === 0 // Alternate between paid and unpaid
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seeding complete')
    await prisma.$disconnect()
  })

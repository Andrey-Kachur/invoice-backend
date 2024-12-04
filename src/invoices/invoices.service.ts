import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.invoice.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.invoice.findUnique({
      where: { id }
    })
  }

  async getTotal() {
    return await this.prisma.invoice.groupBy({
      by: ['due_date'],
      _sum: {
        amount: true
      }
    })
  }
}

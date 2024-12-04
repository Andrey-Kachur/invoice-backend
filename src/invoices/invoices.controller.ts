import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { InvoicesService } from './invoices.service'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll()
  }

  @Get('total')
  getTotal() {
    return this.invoicesService.getTotal()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id)
  }
}

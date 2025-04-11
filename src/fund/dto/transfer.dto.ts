export class TransferDto {
    toAccount: string;
    amount: number;
    mode: 'NEFT' | 'RTGS' | 'IMPS';
  }
  
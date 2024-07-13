import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, Transaction } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'customer_name',
    'date',
    'amount',
    'Preview Graph',
  ];

  customers: Customer[] | any = [
    { id: '1', name: 'Ahmed Ali' },
    { id: '2', name: 'Aya Elsayed' },
    { id: '3', name: 'Mina Adel' },
    { id: '4', name: 'Sarah Reda' },
    { id: '5', name: 'Mohamed Sayed' },
  ];

  transactions: Transaction[] | any = [
    { id: '1', customer_id: '1', date: '2022-01-01', amount: '1000' },
    { id: '2', customer_id: '1', date: '2022-01-02', amount: '2000' },
    { id: '3', customer_id: '2', date: '2022-01-01', amount: '550' },
    { id: '4', customer_id: '3', date: '2022-01-01', amount: '500' },
    { id: '5', customer_id: '2', date: '2022-01-02', amount: '1300' },
    { id: '6', customer_id: '4', date: '2022-01-01', amount: '750' },
    { id: '7', customer_id: '3', date: '2022-01-02', amount: '1250' },
    { id: '8', customer_id: '5', date: '2022-01-01', amount: '2500' },
    { id: '9', customer_id: '5', date: '2022-01-02', amount: '875' },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<Transaction>;

  currentItem: any;
  constructor() {
    // Initialize dataSource with merged data
    this.dataSource = new MatTableDataSource(
      this.mergeTransactionsWithCustomers()
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mergeTransactionsWithCustomers() {
    return this.transactions.map((transaction: any) => ({
      ...transaction,
      customer_name: this.customers.find(
        (customer: Customer) => customer.id === transaction.customer_id
      )?.name,
    }));
  }

  viewGraph(row: any) {
    this.selectCustomerTransactions(row.customer_id);
    // console.log(this.currentItem);
  }

  selectCustomerTransactions(customerId: string) {
    const filteredTransactions = this.transactions.filter(
      (t: { customer_id: string }) => t.customer_id === customerId
    );

    const transactionsByDate: { [date: string]: number } =
      filteredTransactions.reduce(
        (
          acc: { [date: string]: number },
          current: { date: string; amount: string }
        ) => {
          const date = current.date;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += parseFloat(current.amount);
          return acc;
        },
        {}
      );

    const dates = Object.keys(transactionsByDate).sort();
    const amounts = dates.map((date) => transactionsByDate[date]);

    this.currentItem = { dates, amounts };
    console.log(this.currentItem);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    // Applying filter by name
    this.dataSource.filter = filterValue;

    // Custom filter by amount
    const amountFilter = parseFloat(filterValue);
    if (!isNaN(amountFilter)) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const amount = parseFloat(filter);
        return data.amount === amount;
      };
      this.dataSource.filter = filterValue;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

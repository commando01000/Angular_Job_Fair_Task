import { HttpClient } from '@angular/common/http';
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

  customers: Customer[] = [];
  transactions : Transaction[] | any = [];
  
  loadData() {
    this._http.get<any>('assets/data.json').subscribe(data => {
      this.customers = data.customers;
      this.transactions = data.transactions;
      console.log(this.transactions);
      this.dataSource = new MatTableDataSource(
        this.mergeTransactionsWithCustomers()
      );
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<Transaction> | any;

  currentItem: any;
  constructor(private _http: HttpClient) {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mergeTransactionsWithCustomers() {
    console.log(this.customers);
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

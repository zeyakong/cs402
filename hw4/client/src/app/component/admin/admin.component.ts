import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from 'src/app/_sevice/login.service';
import { User } from 'src/app/_model/User';
import { AdminService } from '../../_sevice/admin.service'
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  @Input() email: string; firstname: string; password: string; lastname: string; selectedRole: string; enabled: boolean = false; statusValue: string = 'true'; roleValue: string = 'user';
  user: User;

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private adminService: AdminService,
  ) {
    let user: User = this.loginService.getUser();
    if (user && user.role == 'admin') {
      this.user = user;
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {

    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // // ignore new term if same as previous term
      // distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.adminService.getUsers(this.user._id, term).pipe(
        map(arr =>
          arr.filter(user => {
            return user.role == this.roleValue && user.enabled == (this.statusValue == 'true');
          })
        )
      )),
    );
  }

  logout() {
    this.loginService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }

  createUser() {
    if (this.email && this.firstname && this.lastname && this.password && this.selectedRole) {
      let user: User = new User();
      user.email = this.email;
      user.password = this.password;
      user.enabled = this.enabled;
      user.firstName = this.firstname;
      user.lastName = this.lastname;
      user.role = this.selectedRole;

      this.adminService.createUser(this.user._id, user).subscribe(
        data => {
          if (data) {
            alert('create successfully');
            this.email = '';
            this.password = '';
            this.enabled = false;
            this.firstname = '';
            this.lastname = '';
            this.selectedRole = '';
          }
        },
        err => {
          if (err) {
            alert(err.error.msg);
          }
        });
    } else {
      alert('Please complete the form.');
    }
  }

  changeStatus(user: User, searchValue: string) {
    let newStatus = !user.enabled;
    this.adminService.updateUser(this.user._id, user._id, newStatus).subscribe(user => {
      this.search(searchValue);
    });
  }
}

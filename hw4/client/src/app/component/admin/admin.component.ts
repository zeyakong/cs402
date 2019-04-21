import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from 'src/app/_sevice/login.service';
import { User } from 'src/app/_model/User';
import { AdminService } from '../../_sevice/admin.service'
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  adminId: string = null;
  @Input() email: string; firstname: string; password: string; lastname: string; selectedRole: string; enabled: boolean = false;

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    
    this.activatedRouter.params.subscribe(params => {
      this.adminId = params['aid'];
    });

    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.adminService.getUsers(this.adminId, term)),
    );
  }

  logout() {
    this.loginService.logout().subscribe(
      data => {
        //successfully logged out.
        //delete local storage
        this.router.navigate(['/login']);
      },
      error => {
        if (error) {
          //some error happened.
          this.router.navigate(['/login']);
        }
      });
  }

  createUser() {
    console.log('email ' + this.email + ',name: ' + this.firstname + this.lastname + ", password: " + this.password + ", role:" + this.selectedRole + ", enabled: " + this.enabled)
    let user: User = new User();
    user.email = this.email;
    user.password = this.password;
    user.enabled = this.enabled;
    user.firstName = this.firstname;
    user.lastName = this.lastname;
    user.role = this.selectedRole;
    console.log(user);

    this.adminService.createUser(this.adminId, user).subscribe(
      data => {
        if (data) {
          console.log("success" + data);
        }
      },
      err => {
        if (err) {
          console.log('err:' + err)
        }
      });
  }
}

import {
    AuthService
} from './../../services/auth.service';
import {
    ModalsComponent
} from './../modals/modal';

export class SignUpComponent {
    constructor() {
        this._authService = new AuthService();
        this._modal = new ModalsComponent();
    }

    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Login to Social.</h3>
                <p class="text-secondary">Enter your data to your Social account.</p>
                <form name="SignUpForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <input type="nickname" class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname" required data-pattern="^\S+[a-z]+$">
                        <input type="first_name" class="form-control form-control-sm mt-3" id="first_name" placeholder="first_name" required data-pattern="^\S+[a-z]+$">
                        <input type="last_name" class="form-control form-control-sm mt-3" id="last_name" placeholder="last_name" required data-pattern="^\S+[a-z]+$">
                        <input type="phone" class="form-control form-control-sm mt-3" id="phone" placeholder="phone" required data-pattern="\d{11}">
                        <select type="gender_orientation" class="form-control form-control-sm mt-3" id="gender_orientation" placeholder="gender_orientation" >
                            <option>gender_orientation</option>
                            <option>male</option>
                            <option>female</option>
                        </select>
                        <input type="city" class="form-control form-control-sm mt-3" id="city" placeholder="city" required data-pattern="^\S+[a-z]+$">
                        <input type="country" class="form-control form-control-sm mt-3" id="country" placeholder="country" required data-pattern="^\S+[a-z]+$">
                        <input type="date_of_birth_day" class="form-control form-control-sm mt-3" id="date_of_birth_day" placeholder="date_of_birth_day" required data-pattern="\d\d">
                        <input type="date_of_birth_month" class="form-control form-control-sm mt-3" id="date_of_birth_month" placeholder="date_of_birth_month" required data-pattern="\d\d">
                        <input type="date_of_birth_year" class="form-control form-control-sm mt-3" id="date_of_birth_year" placeholder="date_of_birth_year" required data-pattern="\d{4}">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">SingUp</button>
                        </div>
                        <a href="#/">Go to Home page</a>
                        <br><a href="/#/login">Go to Login</a>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
    }

    afterRender() {
        document.forms.SignUpForm.addEventListener('submit', e => {
            e.preventDefault();

            const {
                email,
                password,
                nickname,
                first_name,
                last_name,
                phone,
                gender_orientation,
                city,
                country,
                date_of_birth_day,
                date_of_birth_month,
                date_of_birth_year
            } = e.target.elements;

            if (!email.value || !password.value || !nickname.value || !first_name.value || !last_name.value || !phone.value || !gender_orientation.value || !city.value || !country.value || !date_of_birth_day.value || !date_of_birth_month.value || !date_of_birth_year.value) {
                return console.warn('Заполните все поля');
            }

            // const data = { 
            //     email,
            //     password,
            //     nickname,
            //     first_name,
            //     last_name,
            //     phone,
            //     gender_orientation,
            //     city,
            //     country,
            //     date_of_birth_day,
            //     date_of_birth_month,
            //     date_of_birth_year
            // }

            this._authService.signUp(email.value,
                password.value,
                nickname.value,
                first_name.value,
                last_name.value,
                phone.value,
                gender_orientation.value,
                city.value,
                country.value,
                date_of_birth_day.value,
                date_of_birth_month.value,
                date_of_birth_year.value)
                .then(response => console.log(response))
                .catch(err => this._modal.render(err.message));
        });
    }
}
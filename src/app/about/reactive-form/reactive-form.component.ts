import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';


@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

    contactForm: FormGroup;

    message = new ReactiveMessage();

    courses = ['Angular', 'JavaFx', 'Java8', 'OrmLite'];

    ngOnInit() {
        this.contactForm = new FormGroup({
            topic: new FormControl(null, Validators.required),
            message: new FormControl(null, [Validators.required, Validators.minLength(10)]),
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            course: new FormControl(this.courses[3]),
            bot: new FormControl(null),
            questions: new FormArray([new FormControl(null), new FormControl(null)], this.questionsValidator)
        });
        // this.contactForm.valueChanges.subscribe(value => {
        //     console.log(value);
        // });
        this.contactForm.get('topic').valueChanges.subscribe(value => {
            console.log(value);
        });
        this.contactForm.get('email').statusChanges.subscribe(value => {
            console.log(value);
        });
    }

    addQuestions() {
        const arr = <FormArray>this.contactForm.get('questions');
        arr.push(new FormControl(null));
    }

    questionsValidator(control: AbstractControl): ValidationErrors {
        const arr = <[string]>control.value;
        if (arr.includes('angularjs')) {
            return {forbbidenCourse: true};
        }
    }

    onSubmit() {
        console.log(this.contactForm);
        this.message.topic = this.contactForm.get('topic').value;
        this.message.name = this.contactForm.value.name;
        this.message.message = this.contactForm.value.message;
        this.message.email = this.contactForm.value.email;
        this.message.course = this.contactForm.value.course;
        this.message.bot = this.contactForm.value.bot;
        this.onReset();
    }

    onReset() {
        this.contactForm.reset({
            // this.contactForm.patchValue({
            topic: 'Wow!',
            // course: this.courses[3]
        });
    }
}

class ReactiveMessage {
    constructor(
        public topic?: string,
        public message?: string,
        public name?: string,
        public email?: string,
        public course = 'Angular',
        public bot?: boolean
    ) {
    }
}

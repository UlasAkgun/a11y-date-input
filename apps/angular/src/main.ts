import '../../../packages/a11y-date-input/dist';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [],
}).catch((err) => console.error(err));

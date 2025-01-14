import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeSummaryComponent } from './home-summary/home-summary.component';
import { HomeHighlightedServiceComponent } from './home-highlighted-service/home-highlighted-service.component';
import { HomeServicesListComponent } from './home-services-list/home-services-list.component';
import { HomeHighlightedGuideComponent } from './home-highlighted-guide/home-highlighted-guide.component';
import { HomeClientTestemonialsComponent } from './home-client-testemonials/home-client-testemonials.component';
import { HomeMarketingMessageComponent } from './home-marketing-message/home-marketing-message.component';
import { HomeTrialComponent } from './home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from './home-social-showcase/home-social-showcase.component';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeBannerComponent,
    HomeSummaryComponent,
    HomeHighlightedServiceComponent,
    HomeServicesListComponent,
    HomeHighlightedGuideComponent,
    HomeClientTestemonialsComponent,
    HomeMarketingMessageComponent,
    HomeTrialComponent,
    HomeSocialShowcaseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParamMap.subscribe(params => {
        const emailVerification = params.get('email-verification');
        if (emailVerification) {
          this.authService.openEmailVerificationDialog(emailVerification);
        }
        const passwordReset = params.get('password-reset');
        if (passwordReset) {
          this.authService.openPasswordResetDialog(passwordReset);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

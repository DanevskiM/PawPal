import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

export const prestojGuard: CanActivateFn = (route) => {
  const registrationService = inject(RegistrationService);
  const router = inject(Router);

  const routeId = route.paramMap.get('id');
  const serviceId = registrationService.registrationId();
  const canAccess = registrationService.canAccessPrestoj();

  console.log('Guard routeId:', routeId);
  console.log('Guard serviceId:', serviceId);
  console.log('Guard canAccessPrestoj:', canAccess);

  if (canAccess && routeId && serviceId && String(routeId) === String(serviceId)) {
    return true;
  }

  return router.createUrlTree(['/registracija']);
};

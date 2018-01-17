import { Injectable, Sanitizer, SecurityContext } from '@angular/core';

@Injectable()
export class NoSanitizationService implements Sanitizer {
  sanitize(ctx: SecurityContext, value: any): string {
    // console.log(ctx);
    // console.log(value);
    return value;
  }
}

// export const NO_SANITIZATION_PROVIDERS: any[] = [
//   { provide: DomSanitizer, useClass: NoSanitizationService },
// ];

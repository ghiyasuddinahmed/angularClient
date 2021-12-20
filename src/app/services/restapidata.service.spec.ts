import { TestBed } from '@angular/core/testing';

import { RestapidataService } from './restapidata.service';

describe('RestapidataService', () => {
  let service: RestapidataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestapidataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

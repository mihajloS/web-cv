import { TestBed } from '@angular/core/testing';

import { RoutingRulesService } from './routing-rules.service';

describe('RoutingRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingRulesService = TestBed.get(RoutingRulesService);
    expect(service).toBeTruthy();
  });
});

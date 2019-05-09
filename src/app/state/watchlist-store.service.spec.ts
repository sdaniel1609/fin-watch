import { TestBed } from '@angular/core/testing';

import { WatchlistStore } from './watchlist-store.service';

describe('WatchlistStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatchlistStore = TestBed.get(WatchlistStore);
    expect(service).toBeTruthy();
  });
});

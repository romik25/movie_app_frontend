import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should emit true on isLoading when show is called', (done) => {
      service.isLoading.subscribe((isLoading) => {
        expect(isLoading).toBe(true);
        done(); // Call done() to signal the completion of the asynchronous test
      });

      service.show(); // Call the method that triggers the emission
    });
  });

  describe('hide', () => {
    it('should emit false on isLoading when hide is called', (done) => {
      service.isLoading.subscribe((isLoading) => {
        expect(isLoading).toBe(false);
        done(); // Call done() to signal the completion of the asynchronous test
      });

      service.hide(); // Call the method that triggers the emission
    });
  });
});

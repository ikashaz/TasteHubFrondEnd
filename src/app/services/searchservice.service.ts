import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SearchService {
  private searchQuerySource = new Subject<string>(); // Observable for search queries
  private searchResultsSource = new Subject<any[]>(); // Observable for search results

  searchQuery$ = this.searchQuerySource.asObservable();
  searchResults$ = this.searchResultsSource.asObservable();

  updateSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }

  updateSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
}


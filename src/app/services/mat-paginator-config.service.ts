import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";

@Injectable()
export class MatPaginatorConfigService {

  constructor(private matPaginatorIntl: MatPaginatorIntl) {
  }

  public setItemsPerPageLabel(itemsPerPageLabel: string) {
    this.matPaginatorIntl.itemsPerPageLabel = itemsPerPageLabel;
  }
  public setNextPageTiptool(nextPageLabel: string) {
    this.matPaginatorIntl.nextPageLabel = nextPageLabel;
  }
  public setPreviousPageTiptool(previousPageLabel: string) {
    this.matPaginatorIntl.previousPageLabel = previousPageLabel;
  }
  public setFirstPageTiptool(firstPageLabel: string) {
    this.matPaginatorIntl.firstPageLabel = firstPageLabel;
  }
  public setLastPageTiptool(lastPageLabel: string) {
    this.matPaginatorIntl.lastPageLabel = lastPageLabel;
  }
}

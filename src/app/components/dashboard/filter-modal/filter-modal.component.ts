import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { MslService } from '../services/msl.service';
import { LookupDtoWithValues } from '../../dtos/dto.model';
import { HttpClientModule } from '@angular/common/http';

interface Chip {
  backgroundColor: string;
  visible: boolean;
  text: string;
  times: number;
  inputsLabel: string[];
}

interface SectionState {
  id: string;
  expanded: boolean;
}

@Component({
  standalone: true,
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    // HttpClientModule,  
  ],
  providers: [MslService],
  changeDetection: ChangeDetectionStrategy.OnPush // Added to optimize change detection
})
export class FilterModalComponent implements OnInit {
  [key: string]: any; // This index signature allows accessing properties with a string key

  categoryOptions: any;
  manufacturerOptions: any ;
  brandOptions: any;
  subBrandOptions: any;
  skuOptions: any;
  containerOptions = [
    { label: 'All', id: null, selected: false },
    { label: 'Container 1', id: 1, selected: false },
    { label: 'Container 2', id: 2, selected: false }
  ];
  subchannelOptions :any;
  filteredsubchannelOptions :any;
  resegmentationOptions :any;
  filteredresegmentationOptions :any;
  sitesOptions :any;
  filteredsitesOptions :any;
  unitManagerOptions :any;
  yearOptions: any[] = [];
  quarterOptions = [
    { label: 'Q1', id: 'Q1', selected: false },
    { label: 'Q2', id: 'Q2', selected: false },
    { label: 'Q3', id: 'Q3', selected: false },
    { label: 'Q4', id: 'Q4', selected: false }
  ];
  monthOptions = [
    { label: 'January', id: "1", selected: false },
    { label: 'February', id: "2", selected: false },
    { label: 'March', id: "3", selected: false },
    { label: 'April', id: "4", selected: false },
    { label: 'May', id: "5", selected: false },
    { label: 'June', id: "6", selected: false },
    { label: 'July', id: "7", selected: false },
    { label: 'August', id: "8", selected: false },
    { label: 'September', id: "9", selected: false },
    { label: 'October', id: "10", selected: false },
    { label: 'November', id: "11", selected: false },
    { label: 'December', id: "12", selected: false }
  ];
  weekOptions = [
    { label: 'Week 1', id: "1", selected: false },
    { label: 'Week 2', id: "2", selected: false },
    { label: 'Week 3', id: "3", selected: false },
    { label: 'Week 4', id: '4', selected: false }
  ];
  dateOptions = [
    { label: '1st', value: 1, selected: false },
    { label: '2nd', value: 2, selected: false }
  ];

  selectedYear: any[] = [];
  selectedQuarter: any[] = [];
  month: any[] = [];
  week: any[] = [];
  selectedContainer: any[] = [];
  categoryId: any[] = [];
  selectedManufacturer: any[] = [];
  selectedBrand: any[] = [];
  selectedSubBrand: any[] = [];
  selectedSKU: any[] = [];
  selectedRegion: any[] = [];
  selectedBranch: any[] = [];
  siteId: any[] = [];
  selectedArea: any[] = [];
  subChannelId: any[] = [];
  selectedStoreNo: any;
  selectedStoreName: any[] = [];
  selectedDistribution: any[] = [];
  reSegmentationId: any[] = [];
  selectedChannelHead: any[] = [];
  selectedAreaSalesManager: any[] = [];
  unitManagerId: any[] = [];
  selectedSupervisor: any[] = [];
  selectedSalesRepresentative: any[] = [];

  activeIndex: number | number[] = 0;

  header!: string;
  chips: Chip[] = [
    { backgroundColor: '#eef5e7', visible: false, text: 'Date', times: 0, inputsLabel: ['selectedYear', 'selectedQuarter', 'month', 'week', 'dateFrom', 'dateTo'] },
    { backgroundColor: '#fceacc', visible: false, text: 'Container', times: 0, inputsLabel: ['selectedContainer'] },
    { backgroundColor: '#f0e6ff', visible: false, text: 'Category', times: 0, inputsLabel: ['categoryId', 'selectedManufacturer', 'selectedBrand', 'selectedSubBrand', 'selectedSKU'] },
    { backgroundColor: '#e6f7f8', visible: false, text: 'Location', times: 0, inputsLabel: ['selectedRegion', 'selectedBranch', 'siteId', 'selectedArea'] },
    { backgroundColor: '#ffe6e6', visible: false, text: 'Channel', times: 0, inputsLabel: ['subChannelId'] },
    { backgroundColor: '#e6eaff', visible: false, text: 'Store', times: 0, inputsLabel: ['selectedStoreNo', 'selectedStoreName', 'selectedDistribution', 'reSegmentationId'] },
    { backgroundColor: '#fceacc', visible: false, text: 'User', times: 0, inputsLabel: ['selectedChannelHead', 'selectedAreaSalesManager', 'unitManagerId', 'selectedSupervisor', 'selectedSalesRepresentative'] }
  ];

  sections: SectionState[] = [
    { id: 'Date', expanded: false },
    { id: 'Container', expanded: false },
    { id: 'Category', expanded: false },
    { id: 'Location', expanded: false },
    { id: 'Channel', expanded: false },
    { id: 'Store', expanded: false },
    { id: 'User', expanded: false }
  ];
  dateFrom: any;
  dateTo: any;
  regionOptions: any ;
  branchOptions: any ;
  areaOptions: any ;
  storeNameOptions: any = [
    { label: 'All', id: null, selected: false },
    { label: 'storeName 1', id: 1, selected: false },
    { label: 'storeName 2', id: 2, selected: false }
  ];
  distributionOptions: any = [
    { label: 'All', id: null, selected: false },
    { label: 'DC', id: 1, selected: false },
    { label: 'SD', id: 2, selected: false }
  ];
  channelHeadOptions: any;
  areaSalesManagerOptions: any ;
  supervisorOptions: any ;
  salesRepresentativeOptions: any ;
  searchText: any;


  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private mslService: MslService

  ) {
    for (let i = 0; i < 50; i++) {
      const year = 2024 + i;
      this.yearOptions.push({ label: year.toString(), value: year, selected: false });
    }
  }

  ngOnInit(): void {

    this.getLockUps();


    const data = this.config.data;
    if (data) {
      console.log(data);
      this.applyPreviousSearchCriteria({
        reSegmentationId: data.reSegmentationId,
        siteId: data.siteId,
        month: data.month,
        unitManagerId: data.unitManagerId,
        subChannelId: data.subChannelId,
        categoryId: data.categoryId,
        week: data.week,
      })
    }
    this.header = this.config.header || "";

    setTimeout(() => {
      this.addEventListenersToLabels();
    }, 100);
  }

  // Method to apply previous search criteria
  applyPreviousSearchCriteria(previousSearch: any) {

    ////////////////
    this.reSegmentationId = []; // Clear the previous selection
    this.resegmentationOptions.forEach((option: { id: string; selected: boolean; }) => {
      if (previousSearch.reSegmentationId.map(String).includes(option.id)) {
        option.selected = true;
        this.reSegmentationId.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
    //////////////////
    this.sitesOptions.forEach((option: { id: string; selected: boolean; }) => {
      if (previousSearch.siteId.map(String).includes(option.id)) {
        option.selected = true;
        this.siteId.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
   ////////////
   //////////////////
       this.monthOptions.forEach((option: { id: any; selected: boolean; }) => {
        if (previousSearch.month.map(String).includes(option.id)) {
          option.selected = true;
          this.month.push(option); // Add selected options to reSegmentationId
        } else {
          option.selected = false;
        }
      });
    ////////////
    ////////////
    this.unitManagerOptions.forEach((option: { id: any; selected: boolean; }) => {
      if (previousSearch.unitManagerId.map(String).includes(option.id)) {
        option.selected = true;
        this.unitManagerId.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
    ////////////
    ////////////
    this.subchannelOptions.forEach((option: { id: any; selected: boolean; }) => {
      if (previousSearch.subChannelId.map(String).includes(option.id)) {
        option.selected = true;
        this.subChannelId.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
    ////////////
    ////////////
    this.categoryOptions.forEach((option: { id: any; selected: boolean; }) => {
      if (previousSearch.categoryId.map(String).includes(option.id)) {
        option.selected = true;
        this.categoryId.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
    ////////////
    ////////////
    this.weekOptions.forEach((option: { id: any; selected: boolean; }) => {
      if (previousSearch.week.map(String).includes(option.id)) {
        option.selected = true;
        this.week.push(option); // Add selected options to reSegmentationId
      } else {
        option.selected = false;
      }
    });
    ////////////
  }

  // stopPropagation to all label elements
  addEventListenersToLabels() {
    // Select all label elements in the DOM
    const labels = document.querySelectorAll('.form-check-label');
    labels.forEach((label) => {
      // Example: Add a click event listener to each label
      label.addEventListener('click', (event) => {
        // Handle the click event
        event.stopPropagation()
        console.log(`Label clicked: ${label.textContent}`);
      });
    });
  }

  clearFilters() {
    this.selectedContainer = [];
    this.selectedYear = [];
    this.selectedQuarter = [];
    this.month = [];
    this.week = [];
    this.categoryId = [];
    this.selectedManufacturer = [];
    this.selectedBrand = [];
    this.selectedSubBrand = [];
    this.selectedSKU = [];
    this.selectedRegion = [];
    this.selectedBranch = [];
    this.siteId = [];
    this.selectedArea = [];
    this.subChannelId = [];
    this.selectedStoreNo = null;
    this.selectedStoreName = [];
    this.selectedDistribution = [];
    this.reSegmentationId = [];
    this.selectedChannelHead = [];
    this.selectedAreaSalesManager = [];
    this.unitManagerId = [];
    this.selectedSupervisor = [];
    this.selectedSalesRepresentative = [];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Loop through each checkbox and uncheck it
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  applyFilters() {
    this.ref.close({ listChanged: true });
  }

  close() {
    this.ref.close();
  }

  removeChip(index: number) {
    this.chips[index].visible = false;
    // add logic to reset related inputs
    this.chips[index].inputsLabel.forEach(field => {
      (this as Record<string, any>)[field] = [];
    });
  }

  clearAll() {
    this.chips.forEach(chip => chip.times = 0);
    this.clearFilters();
  }

  applyChanges() {
    let filterObj = {
      reSegmentationId: this.reSegmentationId.map(item => +item.id),
      siteId: this.siteId.map(item => +item.id),
      unitManagerId: this.unitManagerId.map(item => +item.id),
      subChannelId: this.subChannelId.map(item => +item.id),
      categoryId: this.categoryId.map(item => +item.id),
      year: this.selectedYear,
      month: this.month.map(item => +item.id),
      week: this.week.map(item => +item.id),

    }
    this.ref.close(filterObj);
    console.log('Changes applied');
  }

  countFilledFields(fields: string[], index: number): number {
    let count = 0;
    fields.forEach(field => {
      if ((this as Record<string, any>)[field]?.length > 0) {
        count++;
        this.chips[index].visible = true;
      }
    });
    return count;
  }

  updateChipCount(chipIndex: number, fields: string[]) {
    this.chips[chipIndex].times = this.countFilledFields(fields, chipIndex);
  }

  onFieldChange() {
    console.log('Field change detected');
    this.updateChipCount(0, ['selectedYear', 'selectedQuarter', 'month', 'week', 'dateFrom', 'dateTo']);
    this.updateChipCount(1, ['selectedContainer']);
    this.updateChipCount(2, ['categoryId', 'selectedManufacturer', 'selectedBrand', 'selectedSubBrand', 'selectedSKU']);
    this.updateChipCount(3, ['selectedRegion', 'selectedBranch', 'siteId', 'selectedArea']);
    this.updateChipCount(4, ['subChannelId']);
    this.updateChipCount(5, ['selectedStoreNo', 'selectedStoreName', 'selectedDistribution', 'reSegmentationId']);
    this.updateChipCount(6, ['selectedChannelHead', 'selectedAreaSalesManager', 'unitManagerId', 'selectedSupervisor', 'selectedSalesRepresentative']);
  }

  scrollToSection(index: number): void {
    const sectionId = 'section' + index;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleAccordion(sectionId: string) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.expanded = !section.expanded;
    }
  }

  isExpanded(sectionId: string): boolean {
    const section = this.sections.find(sec => sec.id === sectionId);
    return section ? section.expanded : false;
  }

  // Multi-select related methods

  onOptionChange(option: any, selectedList: any[], selectedArr: string) {
    if (option.selected) {
      selectedList.push(option);
      (this as any)[selectedArr] = [...selectedList]; // Dynamically access the property
      console.log("selected", selectedArr);

    } else {
      selectedList = selectedList.filter((item: { id: any; }) => item.id !== option.id);
      (this as any)[selectedArr] = [...selectedList]; // Dynamically access the property
      console.log("selectedArr = ", selectedArr);

    }
    this.onFieldChange(); // Trigger any additional logic when selection changes
    console.log(selectedList);
    this.getSelectedOptionsLabel(selectedList)
  }

  getSelectedOptionsLabel(selectedList: any[]): string {
    if (selectedList.length > 0) {
      return selectedList.map((y: { label: any; }) => y.label).join(', ');
    } else {
      return '';
    }
  };
  lookupData?: {
    reSegmentations: any[],
    subChannels: any[],
    sites:any[],
    skUs:any[],
    categories:any[],
    containerSizes: LookupDtoWithValues[],
    unitManagers: any,
    ////////////
    supervisors:any[],
    subBrands:any[],
    salesRep:any[],
    regions:any[],
    manufacturers:any[],
    containerTypes:any[],
    channelHeads:any[],
    brands:any[],
    branchs:any[],
    areas:any[],
    areaSalesManagers:any[],


    ////////////
    totalStoresCount: number,
  };
  getLockUps() {
    const lookupSubscription = this.mslService.getLookupsForMapping().subscribe({
      next: (res) => {
        const data = res;
        this.lookupData = {
          reSegmentations: data.reSegmentations.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          //////////
          areaSalesManagers: data.areaSalesManagers.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          areas: data.areas.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          branchs: data.branchs.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          brands: data.brands.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          channelHeads: data.channelHeads.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          containerTypes: data.containerTypes.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          manufacturers: data.manufacturers.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          regions: data.regions.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          salesRep: data.salesRep.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          subBrands: data.subBrands.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          supervisors: data.supervisors.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),

          ///////////
          subChannels: data.subChannels.map((item: any) =>{
            return { label: item.label, id: item.id, selected: false }
          }
          ),
          sites: data.sites.map((item: any) =>{
            return { label: item.label, id: item.id, selected: false } 
          }
          ),
          containerSizes: data.containerSizes.map((item: any) =>
            new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
          ),
          unitManagers: data.unitManagers.map((item: any) =>{
            return { label: item.label, id: item.id, selected: false }
          }
          ),
          skUs: data.skUs.map((item: any) =>{
            return { label: item.label, id: item.id, selected: false }
          }
          ),
          categories: data.categories.map((item: any) =>{
            return { label: item.label, id: item.id, selected: false }
          }
          ),
          totalStoresCount: data.totalStoresCount
        };

       this.unitManagerOptions = this.lookupData?.unitManagers;
       this.sitesOptions = this.lookupData?.sites;
       this.filteredsitesOptions = [...this.sitesOptions];
       this.skuOptions = this.lookupData?.skUs;
       this.subchannelOptions = this.lookupData?.subChannels;
       this.filteredsubchannelOptions = [...this.lookupData?.subChannels];
       this.categoryOptions = this.lookupData?.categories;
       this.resegmentationOptions = this.lookupData?.reSegmentations;
       this.filteredresegmentationOptions = [...this.resegmentationOptions]
       /////
       this.areaOptions = this.lookupData?.areas;
       this.salesRepresentativeOptions = this.lookupData?.salesRep;
       this.branchOptions = this.lookupData?.branchs;
       this.brandOptions = this.lookupData?.brands;
       this.regionOptions = this.lookupData?.regions;
       this.subBrandOptions = this.lookupData?.subBrands;
       this.supervisorOptions = this.lookupData?.supervisors;
       this.channelHeadOptions = this.lookupData?.channelHeads;
       this.areaSalesManagerOptions = this.lookupData?.areaSalesManagers;
       this.manufacturerOptions = this.lookupData?.manufacturers;

       ////
       console.log(this.lookupData?.reSegmentations);
       
      }
    });

  }
  // Make ddl searchable with dynamic list names to prevent more logic
  filterOptions(mainList: string, filteredList: string) {
    if (this[mainList] && this[filteredList]) { // Ensure both lists are defined
      this[filteredList] = this[mainList].filter((option: { label: string }) =>
        option.label.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}

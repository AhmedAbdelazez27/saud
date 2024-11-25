import { Component, OnInit } from '@angular/core';
const BaseReportingURL = "https://mndlz.reporting.shelfc.com/api/Purity/";
const BaseLookupsURL = "https://mndlz.shelfc.com/api/";
class UnitManagerGroupedOutput {
  constructor(
    public unitManagerId: string,
    public average: number
  ) {}
}

class LookupDtoWithValues {
  constructor(
    public id: string,
    public label: string,
    public purityRuler: number,
    public ccRuler: number
  ) {}
}
class PurityDonutDto {
  constructor(
    public PurityLabel: string,
    public ChargedCoolersLabel: string,
    public PurityPercentage: number,
    public CCPercentage: number,
    public IsPurityBelowTheRuler : boolean,
    public IsCCBelowTheRuler : boolean,
  ) {}
}
class PurityDonutResponseDto {
  constructor(
    public purityPercentage: any,
    public ccPercentage: any,
    public purityStoresCount: any,
    public ccStoresCount: any,
  ) {}
}
class PercentageRequestDto {
  constructor(
    public kpiContainerTypeId: number,
    public reSegmentationId: string,
    public subChannelId: string,
    public siteId: string,
    public unitManagerId: string,
    public week: number,
    public month: number
  ) {}
}

class PurityGroupedOutput {
  constructor(
    public kpiContainerTypeId: number,
    public reSegmentation: string,
    public subChannelId: string,
    public siteId: string,
    public unitManagerId: string,
    public containerSize: number,
    public week: number,
    public month: number,
    public average: number
  ) {}
}

class SubChannelOutputDto {
  constructor(
    public id: string,
    public label: string,
    public purityValue: number,
    public chargedCoolerValue: number,
    public isPurityBelowRuler: boolean,
    public isCcBelowRuler: boolean
  ) {}
}

class SiteGroupedOutput {
  constructor(
    public siteId: string,
    public average: number
  ) {}
}

class ContainerSizeGroupedOutput {
  constructor(
    public containerSize: string,
    public average: number
  ) {}
}

@Component({
  selector: 'app-purity-data-collector',
  templateUrl: './purity-data-collector.component.html',
  styleUrls: ['./purity-data-collector.component.scss'],
  standalone: true
})
export class PurityDataCollectorComponent implements OnInit {

  lookupData?: {
    reSegmentations: LookupDtoWithValues[],
    subChannels: LookupDtoWithValues[],
    sites: LookupDtoWithValues[],
    containerSizes: LookupDtoWithValues[],
    unitManagers: LookupDtoWithValues[],
    totalStoresCount : number
  };

  constructor() { }

  ngOnInit(): void {
  this.fetchGetLookupsForMapping(new PercentageRequestDto(1,'','','', '', 0, 0));
  }

  async fetchGetLookupsForMapping(inputParam : PercentageRequestDto) {
    try {
      const response = await fetch(BaseLookupsURL + 'Lookups/GetLookupsForMapping', {
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.lookupData = {
        reSegmentations: data.reSegmentations.map((item: any) =>
          new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
        ),
        subChannels: data.subChannels.map((item: any) =>
          new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
        ),
        sites: data.sites.map((item: any) =>
          new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
        ),
        containerSizes: data.containerSizes.map((item: any) =>
          new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
        ),
        unitManagers: data.unitManagers.map((item: any) =>
          new LookupDtoWithValues(item.id, item.label, item.purityRuler, item.ccRuler)
        ),
        totalStoresCount: data.totalStoresCount
      };

      const [
        purityData,
        chargedCoolerData,
        subChannelPurityData,
        subChannelChargedCoolerData,
        siteDataPurity,
        siteDataChargedCooler,
        containerSizeDataPurity,
        containerSizeDataChargedCooler,
        unitManagerPurity,
        unitManagerChargedCoolers,
        donutChartsData
      ] = await Promise.all([
        this.fetchGrouppedBySegmentations(new PercentageRequestDto(1,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedBySegmentations(new PercentageRequestDto(2,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedBySubChannels(new PercentageRequestDto(1,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedBySubChannels(new PercentageRequestDto(2,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedBySiteId(new PercentageRequestDto(1,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedBySiteId(new PercentageRequestDto(2,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedByContainerSizes(new PercentageRequestDto(1,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedByContainerSizes(new PercentageRequestDto(2,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedByUnitManagers(new PercentageRequestDto(1,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchGrouppedByUnitManagers(new PercentageRequestDto(2,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
        this.fetchDonutCharts(new PercentageRequestDto(0,inputParam.reSegmentationId,inputParam.subChannelId,inputParam.siteId, inputParam.unitManagerId, inputParam.week, inputParam.month)),
      ]);
      const purityDonutDto = new PurityDonutDto(
        donutChartsData.purityStoresCount + ' / ' + this.lookupData?.totalStoresCount + ' Stores',
        donutChartsData.ccStoresCount + ' / ' + this.lookupData?.totalStoresCount + ' Stores',
        donutChartsData.purityPercentage,
        donutChartsData.ccPercentage,
        true,
        true
      );
      console.log('Donuts Outputs:', purityDonutDto);
      const segmentationOutputs = this.lookupData?.reSegmentations.map(lookup => {
        const purityOutput = purityData.find((item: PurityGroupedOutput) => item.reSegmentation === lookup.id);
        const chargedCoolerOutput = chargedCoolerData.find((item: PurityGroupedOutput) => item.reSegmentation === lookup.id);

        const purityValue = purityOutput ? purityOutput.average : 0;
        const chargedCoolerValue = chargedCoolerOutput ? chargedCoolerOutput.average : 0;

        const isPurityBelowRuler = purityValue < lookup.purityRuler;
        const isCcBelowRuler = chargedCoolerValue < lookup.ccRuler;

        return new SubChannelOutputDto(
          lookup.id,
          lookup.label,
          purityValue,
          chargedCoolerValue,
          isPurityBelowRuler,
          isCcBelowRuler
        );
      });

      console.log('Segmentation Outputs:', segmentationOutputs);

      const subChannelOutputs = this.lookupData?.subChannels.map(lookup => {
        const purityOutput = subChannelPurityData.find((item: PurityGroupedOutput) => item.subChannelId === lookup.id);
        const chargedCoolerOutput = subChannelChargedCoolerData.find((item: PurityGroupedOutput) => item.subChannelId === lookup.id);
        const purityValue = purityOutput ? purityOutput.average : 0;
        const chargedCoolerValue = chargedCoolerOutput ? chargedCoolerOutput.average : 0;

        const isPurityBelowRuler = purityValue < lookup.purityRuler;
        const isCcBelowRuler = chargedCoolerValue < lookup.ccRuler;

        return new SubChannelOutputDto(
          lookup.id,
          lookup.label,
          purityValue,
          chargedCoolerValue,
          isPurityBelowRuler,
          isCcBelowRuler
        );
      });

      console.log('SubChannel Outputs:', subChannelOutputs);

      const siteOutputsPurity = this.lookupData?.sites.map(lookup => {
        const siteOutput = siteDataPurity.find((item: SiteGroupedOutput) => item.siteId === lookup.id);
        const siteOutputChargedCoolers = siteDataChargedCooler.find((item: SiteGroupedOutput) => item.siteId === lookup.id);
        const averagePurityValue = siteOutput ? siteOutput.average : 0;
        const averageCCValue = siteOutputChargedCoolers ? siteOutputChargedCoolers?.average : 0;
        const isPurityBelowRuler = averagePurityValue < lookup.purityRuler;
        const isCcBelowRuler = averageCCValue < lookup.ccRuler;

        return new SubChannelOutputDto(
          lookup.id,
          lookup.label,
          averagePurityValue,
          averageCCValue,
          isPurityBelowRuler,
          isCcBelowRuler
        );
      });

      console.log('Site Outputs:', siteOutputsPurity);

      const containerSizeOutputsPurity = containerSizeDataPurity.map(item => {
        const lookup = this.lookupData?.containerSizes.find(c => c.id === item.containerSize.toString());
        const ContainerSizeDataPurity = containerSizeDataPurity.find((item: ContainerSizeGroupedOutput) => item.containerSize.toString() === lookup?.id);
        const ContainerSizeDataChargedCoolers = containerSizeDataChargedCooler.find((item: ContainerSizeGroupedOutput) => item.containerSize.toString() === lookup?.id);
        const averagePurityValue = ContainerSizeDataPurity ? ContainerSizeDataPurity.average : 0;
        const averageCCValue = ContainerSizeDataChargedCoolers ? ContainerSizeDataChargedCoolers?.average : 0;
        const purityRuler = lookup ? lookup.purityRuler : 0;
        const ccRuler = lookup ? lookup.ccRuler : 0;

        return new SubChannelOutputDto(
          '',
          lookup? lookup.label: '',
          averagePurityValue,
          averageCCValue,
          item.average < purityRuler,
          item.average < ccRuler
        );
      });

      console.log('Container Size Outputs:', containerSizeOutputsPurity);

      const unitManagerOutputs1 = this.lookupData?.unitManagers.map(lookup => {
        const unitManagerOutputPurity = unitManagerPurity.find((item: UnitManagerGroupedOutput) => item.unitManagerId === lookup.id);
        const unitManagerOutputChargedCoolers = unitManagerChargedCoolers.find((item: UnitManagerGroupedOutput) => item.unitManagerId === lookup.id);
        const averageValuePurity = unitManagerOutputPurity ? unitManagerOutputPurity.average : 0;
        const averageValueChargedCoolers = unitManagerOutputChargedCoolers ? unitManagerOutputChargedCoolers.average : 0;
  
        const isPurityBelowRuler = averageValuePurity < lookup.purityRuler;
        const isCcBelowRuler = averageValueChargedCoolers < lookup.ccRuler;
  
        return new SubChannelOutputDto(
          lookup.id,
          lookup.label,
          averageValuePurity,
          averageValueChargedCoolers,
          isPurityBelowRuler,
          isCcBelowRuler
        );
      });
      console.log('Unit Manager Outputs :', unitManagerOutputs1);

    } catch (error) {
      console.error('Error fetching lookups for mapping:', error);
    }
  }

  async fetchGrouppedBySegmentations(percentageRequestDto: PercentageRequestDto): Promise<PurityGroupedOutput[]> {
    try {
      const response = await fetch(BaseReportingURL + 'GrouppedBySegmentations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((item: any) => new PurityGroupedOutput(0,item.reSegmentation,'','','',0,0,0,item.average));

    } catch (error) {
      console.error(`Error fetching GrouppedBySegmentations :`, error);
      return [];
    }
  }
  async fetchDonutCharts(percentageRequestDto: PercentageRequestDto): Promise<PurityDonutResponseDto> {
    try {
      const response = await fetch(BaseReportingURL + 'Percentages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return new PurityDonutResponseDto(data.purityPercentage,data.ccPercentage,data.purityStoresCount,data.ccStoresCount);

    } catch (error) {
      console.error(`Error fetching DonutCharts :`, error);
      return new PurityDonutResponseDto(0,0,0,0);
    }
  }
  async fetchGrouppedBySubChannels(percentageRequestDto: PercentageRequestDto): Promise<PurityGroupedOutput[]> {
    try {
      const response = await fetch(BaseReportingURL + 'GrouppedBySubChannels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((item: any) => new PurityGroupedOutput(0,'',item.subChannelId,'','',0,0,0,item.average));

    } catch (error) {
      console.error(`Error fetching GrouppedBySubChannels :`, error);
      return [];
    }
  }

  async fetchGrouppedBySiteId(percentageRequestDto: PercentageRequestDto): Promise<SiteGroupedOutput[]> {
    try {
      const response = await fetch(BaseReportingURL + 'GrouppedBySiteId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((item: any) => new SiteGroupedOutput(item.siteId, item.average));

    } catch (error) {
      console.error('Error fetching GrouppedBySiteId:', error);
      return [];
    }
  }

  async fetchGrouppedByContainerSizes(percentageRequestDto: PercentageRequestDto): Promise<ContainerSizeGroupedOutput[]> {
    try {
      const response = await fetch(BaseReportingURL + 'GrouppedByContainerSizes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((item: any) => new ContainerSizeGroupedOutput(item.containerSize, item.average));

    } catch (error) {
      console.error(`Error fetching GrouppedByContainerSizes :`, error);
      return [];
    }
  }
  async fetchGrouppedByUnitManagers(percentageRequestDto: PercentageRequestDto): Promise<UnitManagerGroupedOutput[]> {
    try {
      const response = await fetch(BaseReportingURL + 'GrouppedByUnitManagers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(percentageRequestDto)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.map((item: any) => new UnitManagerGroupedOutput(item.unitManagerId, item.average));
  
    } catch (error) {
      console.error('Error fetching GrouppedByUnitManagers:', error);
      return [];
    }
  }
}

export interface registerTravelDto {
  travelSource: string;
  travelDestination: string;
  travel_time: string; // 'HH:mm' format for time input
  travelDate: string; // 'YYYY-MM-DD' format for date input
  travelCost: string;
  cabId: Number;
  driverId: Number;
}

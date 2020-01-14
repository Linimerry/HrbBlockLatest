export class SeatAllocationDetail{
    constructor(
        public ActualHireDate :Date[],
        public SeatAllocation :number[],
        public location:string        
    ){
    }
}
export class Employee {
    constructor({
      UserId,
      IsAdmin,
      LastLoggedIn,
      DateOfJoining,
      UserName,
      FirstName,
      ImageId,
      LastName,
      EmployeeId,
      JobTitle,
      EmailAddress,
      KeepMeSignedInToThisDevice,
    }) {
      this.UserId = UserId;
      this.IsAdmin = IsAdmin;
      this.LastLoggedIn = LastLoggedIn;
      this.DateOfJoining = DateOfJoining;
      this.UserName = UserName;
      this.FirstName = FirstName;
      this.ImageId = ImageId;
      this.LastName = LastName;
      this.EmployeeId = EmployeeId;
      this.JobTitle = JobTitle;
      this.EmailAddress = EmailAddress;
      this.KeepMeSignedInToThisDevice = KeepMeSignedInToThisDevice;
    }
  }
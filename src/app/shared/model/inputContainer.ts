export class InputContainer {
    constructor(args: any) {
        for (const field in args) {
          this[field] = args[field];
        }
      }
}
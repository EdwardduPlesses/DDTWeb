export function defineCancelApiObject(apiObject: Record<string, unknown>) {
  // an object that will contain a cancellation handler
  // associated to each API property name in the apiObject API object
  const cancelApiObject: Record<string, unknown> = {};

  // each property in the apiObject API layer object
  // is associated with a function that defines an API call

  // this loop iterates over each API property name
  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject = {
      controller: undefined as AbortController | undefined, // Fix: Specify the type as AbortController | undefined
    };

    // associating the request cancellation handler with the API property name
    cancelApiObject[apiPropertyName as string] = {
      handleRequestCancellation: () => {
        // if the controller already exists,
        // canceling the request
        if (cancellationControllerObject.controller) {
          // canceling the request and returning this custom message
          cancellationControllerObject.controller.abort(); // Fix: Call the abort() method on the controller
        }
      },
    };
  });

  return cancelApiObject;
}

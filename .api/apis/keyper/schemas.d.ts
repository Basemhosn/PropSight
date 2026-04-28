declare const DeleteApiV2AccesstimeDeletebylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An array of IDs of the access times to delete.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly day: {
                                readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                readonly type: "string";
                                readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                            };
                            readonly startTime: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly endTime: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2AssetDeletebylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of asset IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly registrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly attributeKey1: {
                                readonly type: "string";
                            };
                            readonly attributeValue1: {
                                readonly type: "string";
                            };
                            readonly attributeKey2: {
                                readonly type: "string";
                            };
                            readonly attributeValue2: {
                                readonly type: "string";
                            };
                            readonly attributeKey3: {
                                readonly type: "string";
                            };
                            readonly attributeValue3: {
                                readonly type: "string";
                            };
                            readonly attributeKey4: {
                                readonly type: "string";
                            };
                            readonly attributeValue4: {
                                readonly type: "string";
                            };
                            readonly attributeKey5: {
                                readonly type: "string";
                            };
                            readonly attributeValue5: {
                                readonly type: "string";
                            };
                            readonly attributeKey6: {
                                readonly type: "string";
                            };
                            readonly attributeValue6: {
                                readonly type: "string";
                            };
                            readonly attributeKey7: {
                                readonly type: "string";
                            };
                            readonly attributeValue7: {
                                readonly type: "string";
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly shielded: {
                                readonly type: "boolean";
                            };
                            readonly totalMileage: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly checkoutDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parentAssetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly reservationAssetIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2AssetId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2InventorysessionId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session to delete.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Started", "Finished"];
                            readonly type: "string";
                            readonly description: "`Started` `Finished`";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2InventorysessionscanId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session scan to delete.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly inventorySessionId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly scannedValue: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly isFound: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly scanDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2ReservationId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the reservation.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly confirmationSent: {
                            readonly type: "boolean";
                        };
                        readonly reminderSent: {
                            readonly type: "boolean";
                        };
                        readonly warningSent: {
                            readonly type: "boolean";
                        };
                        readonly expiredSent: {
                            readonly type: "boolean";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly multiUse: {
                            readonly type: "boolean";
                        };
                        readonly checkoutPin: {
                            readonly type: "string";
                        };
                        readonly checkinPin: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2UserDeletebylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userName: {
                                readonly type: "string";
                            };
                            readonly firstName: {
                                readonly type: "string";
                            };
                            readonly lastName: {
                                readonly type: "string";
                            };
                            readonly fullName: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly userRoleType: {
                                readonly enum: readonly ["None", "User", "Admin", "Super"];
                                readonly type: "string";
                                readonly description: "`None` `User` `Admin` `Super`";
                            };
                            readonly phone: {
                                readonly type: "string";
                            };
                            readonly email: {
                                readonly type: "string";
                            };
                            readonly allowEmail: {
                                readonly type: "boolean";
                            };
                            readonly allowSms: {
                                readonly type: "boolean";
                            };
                            readonly allowReportsAccess: {
                                readonly type: "boolean";
                            };
                            readonly allowAssetsAccess: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthRequired: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthAuthorizer: {
                                readonly type: "boolean";
                            };
                            readonly workOrderRequired: {
                                readonly type: "boolean";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly isLockedOut: {
                                readonly type: "boolean";
                            };
                            readonly localeId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly timeZone: {
                                readonly type: "string";
                            };
                            readonly loginDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly requiresTransferApproval: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly hasPin: {
                                readonly type: "boolean";
                            };
                            readonly allowOnBehalfOf: {
                                readonly type: "boolean";
                            };
                            readonly externalIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly typeName: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2UserId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2UseraccessgroupDeletebylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user access group IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly type: {
                                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                                readonly type: "string";
                                readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly restrictAssetList: {
                                readonly type: "boolean";
                            };
                            readonly requireLoginAuth: {
                                readonly type: "boolean";
                            };
                            readonly allowRemoteAuth: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly loginAuthGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly externalAccessGroupId: {
                                readonly type: "string";
                            };
                            readonly isAutoProvisionedGroup: {
                                readonly type: "boolean";
                            };
                            readonly accessTimes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly userAccessGroupId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly day: {
                                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                            readonly type: "string";
                                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                        };
                                        readonly startTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly endTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly isDeletable: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteApiV2UseraccessgroupId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly type: {
                            readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                            readonly type: "string";
                            readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly restrictAssetList: {
                            readonly type: "boolean";
                        };
                        readonly requireLoginAuth: {
                            readonly type: "boolean";
                        };
                        readonly allowRemoteAuth: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly loginAuthGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly externalAccessGroupId: {
                            readonly type: "string";
                        };
                        readonly isAutoProvisionedGroup: {
                            readonly type: "boolean";
                        };
                        readonly accessTimes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly userAccessGroupId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly day: {
                                        readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                        readonly type: "string";
                                        readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                    };
                                    readonly startTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly endTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly isDeletable: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AccesstimeId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the access time to retrieve.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userAccessGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly day: {
                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            readonly type: "string";
                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                        };
                        readonly startTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly endTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Asset: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly assetTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly registrationTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "Registered", "Unregistered"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly statusTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly systemIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly cabinetIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute1Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute2Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute3Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute4Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute5Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute6Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute7Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly registrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly attributeKey1: {
                                readonly type: "string";
                            };
                            readonly attributeValue1: {
                                readonly type: "string";
                            };
                            readonly attributeKey2: {
                                readonly type: "string";
                            };
                            readonly attributeValue2: {
                                readonly type: "string";
                            };
                            readonly attributeKey3: {
                                readonly type: "string";
                            };
                            readonly attributeValue3: {
                                readonly type: "string";
                            };
                            readonly attributeKey4: {
                                readonly type: "string";
                            };
                            readonly attributeValue4: {
                                readonly type: "string";
                            };
                            readonly attributeKey5: {
                                readonly type: "string";
                            };
                            readonly attributeValue5: {
                                readonly type: "string";
                            };
                            readonly attributeKey6: {
                                readonly type: "string";
                            };
                            readonly attributeValue6: {
                                readonly type: "string";
                            };
                            readonly attributeKey7: {
                                readonly type: "string";
                            };
                            readonly attributeValue7: {
                                readonly type: "string";
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly shielded: {
                                readonly type: "boolean";
                            };
                            readonly totalMileage: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly checkoutDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parentAssetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly reservationAssetIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbyfobserialnumberSerialnumber: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly serialNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The FOB serial number.";
                };
            };
            readonly required: readonly ["serialNumber"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbyfobtagTag: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tag: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The FOB tag.";
                };
            };
            readonly required: readonly ["tag"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of asset IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly registrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly attributeKey1: {
                                readonly type: "string";
                            };
                            readonly attributeValue1: {
                                readonly type: "string";
                            };
                            readonly attributeKey2: {
                                readonly type: "string";
                            };
                            readonly attributeValue2: {
                                readonly type: "string";
                            };
                            readonly attributeKey3: {
                                readonly type: "string";
                            };
                            readonly attributeValue3: {
                                readonly type: "string";
                            };
                            readonly attributeKey4: {
                                readonly type: "string";
                            };
                            readonly attributeValue4: {
                                readonly type: "string";
                            };
                            readonly attributeKey5: {
                                readonly type: "string";
                            };
                            readonly attributeValue5: {
                                readonly type: "string";
                            };
                            readonly attributeKey6: {
                                readonly type: "string";
                            };
                            readonly attributeValue6: {
                                readonly type: "string";
                            };
                            readonly attributeKey7: {
                                readonly type: "string";
                            };
                            readonly attributeValue7: {
                                readonly type: "string";
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly shielded: {
                                readonly type: "boolean";
                            };
                            readonly totalMileage: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly checkoutDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parentAssetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly reservationAssetIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbyparentassetidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the parent asset.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbyuseraccessgroupidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly assetTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly registrationTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "Registered", "Unregistered"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly statusTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly systemIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly cabinetIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute1Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute2Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute3Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute4Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute5Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute6Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly attribute7Values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly registrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly attributeKey1: {
                                readonly type: "string";
                            };
                            readonly attributeValue1: {
                                readonly type: "string";
                            };
                            readonly attributeKey2: {
                                readonly type: "string";
                            };
                            readonly attributeValue2: {
                                readonly type: "string";
                            };
                            readonly attributeKey3: {
                                readonly type: "string";
                            };
                            readonly attributeValue3: {
                                readonly type: "string";
                            };
                            readonly attributeKey4: {
                                readonly type: "string";
                            };
                            readonly attributeValue4: {
                                readonly type: "string";
                            };
                            readonly attributeKey5: {
                                readonly type: "string";
                            };
                            readonly attributeValue5: {
                                readonly type: "string";
                            };
                            readonly attributeKey6: {
                                readonly type: "string";
                            };
                            readonly attributeValue6: {
                                readonly type: "string";
                            };
                            readonly attributeKey7: {
                                readonly type: "string";
                            };
                            readonly attributeValue7: {
                                readonly type: "string";
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly shielded: {
                                readonly type: "boolean";
                            };
                            readonly totalMileage: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly checkoutDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parentAssetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly reservationAssetIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetGetbyuseridId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly type: {
                                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly registrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly attributeKey1: {
                                readonly type: "string";
                            };
                            readonly attributeValue1: {
                                readonly type: "string";
                            };
                            readonly attributeKey2: {
                                readonly type: "string";
                            };
                            readonly attributeValue2: {
                                readonly type: "string";
                            };
                            readonly attributeKey3: {
                                readonly type: "string";
                            };
                            readonly attributeValue3: {
                                readonly type: "string";
                            };
                            readonly attributeKey4: {
                                readonly type: "string";
                            };
                            readonly attributeValue4: {
                                readonly type: "string";
                            };
                            readonly attributeKey5: {
                                readonly type: "string";
                            };
                            readonly attributeValue5: {
                                readonly type: "string";
                            };
                            readonly attributeKey6: {
                                readonly type: "string";
                            };
                            readonly attributeValue6: {
                                readonly type: "string";
                            };
                            readonly attributeKey7: {
                                readonly type: "string";
                            };
                            readonly attributeValue7: {
                                readonly type: "string";
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly shielded: {
                                readonly type: "boolean";
                            };
                            readonly totalMileage: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly checkoutDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parentAssetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly reservationAssetIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Assetlog: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly assetId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly startDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly endDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly date: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly assetLogType: {
                                readonly enum: readonly ["Standard", "XTDataSync"];
                                readonly type: "string";
                                readonly description: "`Standard` `XTDataSync`";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssetlogId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset log entry.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly date: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly assetLogType: {
                            readonly enum: readonly ["Standard", "XTDataSync"];
                            readonly type: "string";
                            readonly description: "`Standard` `XTDataSync`";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Assettransaction: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly endDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly assetIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly systemIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly cabinetIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly lotLocationIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly parkingSpaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly statusTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly message: {
                                readonly type: "string";
                            };
                            readonly loginGuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly date: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly companyId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly locationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly dualAuthUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly tripleAuthUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetUnitId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetStatusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly assetRegistrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly assetRemovalType: {
                                readonly enum: readonly ["None", "Legal", "Illegal", "CheckFOB"];
                                readonly type: "string";
                                readonly description: "`None` `Legal` `Illegal` `CheckFOB`";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssettransactionGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IDs of the asset transactions.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly message: {
                                readonly type: "string";
                            };
                            readonly loginGuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly date: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly companyId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly locationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly dualAuthUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly tripleAuthUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetUnitId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly fobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetStatusType: {
                                readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                readonly type: "string";
                                readonly description: "`Any` `In` `Out` `Overdue`";
                            };
                            readonly assetRegistrationType: {
                                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                readonly type: "string";
                                readonly description: "`Any` `Registered` `Unregistered`";
                            };
                            readonly assetRemovalType: {
                                readonly enum: readonly ["None", "Legal", "Illegal", "CheckFOB"];
                                readonly type: "string";
                                readonly description: "`None` `Legal` `Illegal` `CheckFOB`";
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly parkingSpaceId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly processStepId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly onBehalfOfUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AssettransactionId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset transaction.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly loginGuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly date: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly companyId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly locationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly dualAuthUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly tripleAuthUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetUnitId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetStatusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly assetRegistrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly assetRemovalType: {
                            readonly enum: readonly ["None", "Legal", "Illegal", "CheckFOB"];
                            readonly type: "string";
                            readonly description: "`None` `Legal` `Illegal` `CheckFOB`";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Attributecollection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly attributeId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly attributeId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly value: {
                                readonly type: "string";
                            };
                            readonly parentId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Attributes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly displayOrder: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly filter: {
                                readonly type: "boolean";
                            };
                            readonly collection: {
                                readonly type: "boolean";
                            };
                            readonly parentId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly visible: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2AttributesId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset attribute.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly displayOrder: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly filter: {
                            readonly type: "boolean";
                        };
                        readonly collection: {
                            readonly type: "boolean";
                        };
                        readonly parentId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly visible: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Fob: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number2: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly enum: readonly ["Unknown", "Original", "Mk5Standard", "Mk5Lockable", "Mk5LockableHighSecurity", "Other", "HC", "iFob", "XT", "NFC_QR", "QR_ONLY"];
                                readonly type: "string";
                                readonly description: "`Unknown` `Original` `Mk5Standard` `Mk5Lockable` `Mk5LockableHighSecurity` `Other` `HC` `iFob` `XT` `NFC_QR` `QR_ONLY`";
                            };
                            readonly color: {
                                readonly type: "string";
                            };
                            readonly lockable: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly externalFobId: {
                                readonly type: "string";
                            };
                            readonly tag: {
                                readonly type: "string";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly initialCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2FobGetallUnattachedfobs: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number2: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly enum: readonly ["Unknown", "Original", "Mk5Standard", "Mk5Lockable", "Mk5LockableHighSecurity", "Other", "HC", "iFob", "XT", "NFC_QR", "QR_ONLY"];
                                readonly type: "string";
                                readonly description: "`Unknown` `Original` `Mk5Standard` `Mk5Lockable` `Mk5LockableHighSecurity` `Other` `HC` `iFob` `XT` `NFC_QR` `QR_ONLY`";
                            };
                            readonly color: {
                                readonly type: "string";
                            };
                            readonly lockable: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly externalFobId: {
                                readonly type: "string";
                            };
                            readonly tag: {
                                readonly type: "string";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly initialCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2FobGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IDs of the fobs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number2: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly enum: readonly ["Unknown", "Original", "Mk5Standard", "Mk5Lockable", "Mk5LockableHighSecurity", "Other", "HC", "iFob", "XT", "NFC_QR", "QR_ONLY"];
                                readonly type: "string";
                                readonly description: "`Unknown` `Original` `Mk5Standard` `Mk5Lockable` `Mk5LockableHighSecurity` `Other` `HC` `iFob` `XT` `NFC_QR` `QR_ONLY`";
                            };
                            readonly color: {
                                readonly type: "string";
                            };
                            readonly lockable: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly externalFobId: {
                                readonly type: "string";
                            };
                            readonly tag: {
                                readonly type: "string";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly initialCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2FobGetbylistFobnumbers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fobNumber: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The fob numbers.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly number2: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly enum: readonly ["Unknown", "Original", "Mk5Standard", "Mk5Lockable", "Mk5LockableHighSecurity", "Other", "HC", "iFob", "XT", "NFC_QR", "QR_ONLY"];
                                readonly type: "string";
                                readonly description: "`Unknown` `Original` `Mk5Standard` `Mk5Lockable` `Mk5LockableHighSecurity` `Other` `HC` `iFob` `XT` `NFC_QR` `QR_ONLY`";
                            };
                            readonly color: {
                                readonly type: "string";
                            };
                            readonly lockable: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly externalFobId: {
                                readonly type: "string";
                            };
                            readonly tag: {
                                readonly type: "string";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly initialCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastCabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2FobId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the fob.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly number: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly number2: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly enum: readonly ["Unknown", "Original", "Mk5Standard", "Mk5Lockable", "Mk5LockableHighSecurity", "Other", "HC", "iFob", "XT", "NFC_QR", "QR_ONLY"];
                            readonly type: "string";
                            readonly description: "`Unknown` `Original` `Mk5Standard` `Mk5Lockable` `Mk5LockableHighSecurity` `Other` `HC` `iFob` `XT` `NFC_QR` `QR_ONLY`";
                        };
                        readonly color: {
                            readonly type: "string";
                        };
                        readonly lockable: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly externalFobId: {
                            readonly type: "string";
                        };
                        readonly tag: {
                            readonly type: "string";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly initialCabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly lastCabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Healthcheck: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Inventorysession: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly endDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Started", "Finished"];
                                readonly type: "string";
                                readonly description: "`Started` `Finished`";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An array of inventory session IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Started", "Finished"];
                                readonly type: "string";
                                readonly description: "`Started` `Finished`";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionGetbyuseridId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly statusType: {
                                readonly enum: readonly ["Started", "Finished"];
                                readonly type: "string";
                                readonly description: "`Started` `Finished`";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Started", "Finished"];
                            readonly type: "string";
                            readonly description: "`Started` `Finished`";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Inventorysessionscan: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly endDateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly inventorySessionId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly scannedValue: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly isFound: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly scanDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionscanGetbyinventorysessionidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly inventorySessionId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly scannedValue: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly isFound: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly scanDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValue: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session.";
                };
                readonly value: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The scanned value.";
                };
            };
            readonly required: readonly ["id", "value"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly inventorySessionId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly scannedValue: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly isFound: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly scanDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2InventorysessionscanId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session scan.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly inventorySessionId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly scannedValue: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly isFound: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly scanDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Issuereason: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly isCommentRequired: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2IssuereasonId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the issue reason.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly isCommentRequired: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Lotlocation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly lotGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly occupancyLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2LotlocationGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The array of lot location IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly lotGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly occupancyLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2LotlocationId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the lot location.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly lotGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly occupancyLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Parkingspace: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly spaceIdentifier: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly row: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly column: {
                                readonly type: "string";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ParkingspaceGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The array of parking space IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lotLocationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly spaceIdentifier: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly longitude: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly row: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly column: {
                                readonly type: "string";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ParkingspaceId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the parking space.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly spaceIdentifier: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly row: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly column: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Processstep: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly durationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ProcessstepGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The array of process step IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly durationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ProcessstepId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the process step.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly durationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Reservation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly endTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly confirmationSent: {
                                readonly type: "boolean";
                            };
                            readonly reminderSent: {
                                readonly type: "boolean";
                            };
                            readonly warningSent: {
                                readonly type: "boolean";
                            };
                            readonly expiredSent: {
                                readonly type: "boolean";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly multiUse: {
                                readonly type: "boolean";
                            };
                            readonly checkoutPin: {
                                readonly type: "string";
                            };
                            readonly checkinPin: {
                                readonly type: "string";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ReservationGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The array of reservation IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly confirmationSent: {
                                readonly type: "boolean";
                            };
                            readonly reminderSent: {
                                readonly type: "boolean";
                            };
                            readonly warningSent: {
                                readonly type: "boolean";
                            };
                            readonly expiredSent: {
                                readonly type: "boolean";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly multiUse: {
                                readonly type: "boolean";
                            };
                            readonly checkoutPin: {
                                readonly type: "string";
                            };
                            readonly checkinPin: {
                                readonly type: "string";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ReservationGetbyuseridId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The user ID.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly startTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly endTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly issueReasonId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly notes: {
                                readonly type: "string";
                            };
                            readonly confirmationSent: {
                                readonly type: "boolean";
                            };
                            readonly reminderSent: {
                                readonly type: "boolean";
                            };
                            readonly warningSent: {
                                readonly type: "boolean";
                            };
                            readonly expiredSent: {
                                readonly type: "boolean";
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly multiUse: {
                                readonly type: "boolean";
                            };
                            readonly checkoutPin: {
                                readonly type: "string";
                            };
                            readonly checkinPin: {
                                readonly type: "string";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ReservationId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the reservation.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly confirmationSent: {
                            readonly type: "boolean";
                        };
                        readonly reminderSent: {
                            readonly type: "boolean";
                        };
                        readonly warningSent: {
                            readonly type: "boolean";
                        };
                        readonly expiredSent: {
                            readonly type: "boolean";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly multiUse: {
                            readonly type: "boolean";
                        };
                        readonly checkoutPin: {
                            readonly type: "string";
                        };
                        readonly checkinPin: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2ReservationassetGetbyreservationidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the reservation.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly reservationId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly checkoutTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly checkoutUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly checkinTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly checkinUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly expired: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2SocketmapGetallbycabinetidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the cabinet.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly socketMapGuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly linearIndex: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly panelId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly rowNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly columnNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly isOccupied: {
                                readonly type: "boolean";
                            };
                            readonly currentOrLastFobNumber: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly currentOrLastFobId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly asset: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                    };
                                    readonly systemId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly cabinetId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly type: {
                                        readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                                        readonly type: "string";
                                        readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                                    };
                                    readonly statusType: {
                                        readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                                        readonly type: "string";
                                        readonly description: "`Any` `In` `Out` `Overdue`";
                                    };
                                    readonly registrationType: {
                                        readonly enum: readonly ["Any", "Registered", "Unregistered"];
                                        readonly type: "string";
                                        readonly description: "`Any` `Registered` `Unregistered`";
                                    };
                                    readonly attributeKey1: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue1: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey2: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue2: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey3: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue3: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey4: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue4: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey5: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue5: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey6: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue6: {
                                        readonly type: "string";
                                    };
                                    readonly attributeKey7: {
                                        readonly type: "string";
                                    };
                                    readonly attributeValue7: {
                                        readonly type: "string";
                                    };
                                    readonly fobNumber: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly shielded: {
                                        readonly type: "boolean";
                                    };
                                    readonly totalMileage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly outDurationLimit: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly checkoutDate: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                    readonly active: {
                                        readonly type: "boolean";
                                    };
                                    readonly deleted: {
                                        readonly type: "boolean";
                                    };
                                    readonly lotLocationId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly parkingSpaceId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly userId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly issueReasonId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly processStepId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly parentAssetId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly reservationAssetIds: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                    readonly onBehalfOfUserId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2System: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly slotsFree: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly capacity: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useIssueReason: {
                                readonly type: "boolean";
                            };
                            readonly issueReasonListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useProcessStep: {
                                readonly type: "boolean";
                            };
                            readonly processStepListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastHeartbeat: {
                                readonly type: "string";
                            };
                            readonly heartbeatStatus: {
                                readonly type: "string";
                            };
                            readonly cabinets: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly type: {
                                            readonly enum: readonly ["Invalid", "Standard", "LockInAddOn", "SemiElectronic", "NonElectronic"];
                                            readonly type: "string";
                                            readonly description: "`Invalid` `Standard` `LockInAddOn` `SemiElectronic` `NonElectronic`";
                                        };
                                        readonly systemId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly systemName: {
                                            readonly type: "string";
                                        };
                                        readonly guid: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                        };
                                        readonly capacity: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly slotsFree: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly active: {
                                            readonly type: "boolean";
                                        };
                                        readonly deleted: {
                                            readonly type: "boolean";
                                        };
                                        readonly cabinetDeviceUuid: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2SystemGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of system IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly slotsFree: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly capacity: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useIssueReason: {
                                readonly type: "boolean";
                            };
                            readonly issueReasonListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useProcessStep: {
                                readonly type: "boolean";
                            };
                            readonly processStepListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastHeartbeat: {
                                readonly type: "string";
                            };
                            readonly heartbeatStatus: {
                                readonly type: "string";
                            };
                            readonly cabinets: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly type: {
                                            readonly enum: readonly ["Invalid", "Standard", "LockInAddOn", "SemiElectronic", "NonElectronic"];
                                            readonly type: "string";
                                            readonly description: "`Invalid` `Standard` `LockInAddOn` `SemiElectronic` `NonElectronic`";
                                        };
                                        readonly systemId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly systemName: {
                                            readonly type: "string";
                                        };
                                        readonly guid: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                        };
                                        readonly capacity: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly slotsFree: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly active: {
                                            readonly type: "boolean";
                                        };
                                        readonly deleted: {
                                            readonly type: "boolean";
                                        };
                                        readonly cabinetDeviceUuid: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2SystemGetbyuseraccessgroupidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The user access group ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly slotsFree: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly capacity: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useIssueReason: {
                                readonly type: "boolean";
                            };
                            readonly issueReasonListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly useProcessStep: {
                                readonly type: "boolean";
                            };
                            readonly processStepListId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly lastHeartbeat: {
                                readonly type: "string";
                            };
                            readonly heartbeatStatus: {
                                readonly type: "string";
                            };
                            readonly cabinets: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly type: {
                                            readonly enum: readonly ["Invalid", "Standard", "LockInAddOn", "SemiElectronic", "NonElectronic"];
                                            readonly type: "string";
                                            readonly description: "`Invalid` `Standard` `LockInAddOn` `SemiElectronic` `NonElectronic`";
                                        };
                                        readonly systemId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly systemName: {
                                            readonly type: "string";
                                        };
                                        readonly guid: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                        };
                                        readonly capacity: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly slotsFree: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly active: {
                                            readonly type: "boolean";
                                        };
                                        readonly deleted: {
                                            readonly type: "boolean";
                                        };
                                        readonly cabinetDeviceUuid: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2SystemId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the system.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly slotsFree: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly capacity: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly useIssueReason: {
                            readonly type: "boolean";
                        };
                        readonly issueReasonListId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly useProcessStep: {
                            readonly type: "boolean";
                        };
                        readonly processStepListId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly lastHeartbeat: {
                            readonly type: "string";
                        };
                        readonly heartbeatStatus: {
                            readonly type: "string";
                        };
                        readonly cabinets: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly type: {
                                        readonly enum: readonly ["Invalid", "Standard", "LockInAddOn", "SemiElectronic", "NonElectronic"];
                                        readonly type: "string";
                                        readonly description: "`Invalid` `Standard` `LockInAddOn` `SemiElectronic` `NonElectronic`";
                                    };
                                    readonly systemId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly systemName: {
                                        readonly type: "string";
                                    };
                                    readonly guid: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                    };
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                    };
                                    readonly capacity: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly slotsFree: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly active: {
                                        readonly type: "boolean";
                                    };
                                    readonly deleted: {
                                        readonly type: "boolean";
                                    };
                                    readonly cabinetDeviceUuid: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2User: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly userRoleTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["None", "User", "Admin", "Super"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userName: {
                                readonly type: "string";
                            };
                            readonly firstName: {
                                readonly type: "string";
                            };
                            readonly lastName: {
                                readonly type: "string";
                            };
                            readonly fullName: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly userRoleType: {
                                readonly enum: readonly ["None", "User", "Admin", "Super"];
                                readonly type: "string";
                                readonly description: "`None` `User` `Admin` `Super`";
                            };
                            readonly phone: {
                                readonly type: "string";
                            };
                            readonly email: {
                                readonly type: "string";
                            };
                            readonly allowEmail: {
                                readonly type: "boolean";
                            };
                            readonly allowSms: {
                                readonly type: "boolean";
                            };
                            readonly allowReportsAccess: {
                                readonly type: "boolean";
                            };
                            readonly allowAssetsAccess: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthRequired: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthAuthorizer: {
                                readonly type: "boolean";
                            };
                            readonly workOrderRequired: {
                                readonly type: "boolean";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly isLockedOut: {
                                readonly type: "boolean";
                            };
                            readonly localeId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly timeZone: {
                                readonly type: "string";
                            };
                            readonly loginDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly requiresTransferApproval: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly hasPin: {
                                readonly type: "boolean";
                            };
                            readonly allowOnBehalfOf: {
                                readonly type: "boolean";
                            };
                            readonly externalIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly typeName: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UserGetbyexternalidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The external ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly idType: {
                    readonly enum: readonly ["Saml", "Entrata"];
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The type of the external ID.";
                };
            };
            readonly required: readonly ["idType"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UserGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userName: {
                                readonly type: "string";
                            };
                            readonly firstName: {
                                readonly type: "string";
                            };
                            readonly lastName: {
                                readonly type: "string";
                            };
                            readonly fullName: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly userRoleType: {
                                readonly enum: readonly ["None", "User", "Admin", "Super"];
                                readonly type: "string";
                                readonly description: "`None` `User` `Admin` `Super`";
                            };
                            readonly phone: {
                                readonly type: "string";
                            };
                            readonly email: {
                                readonly type: "string";
                            };
                            readonly allowEmail: {
                                readonly type: "boolean";
                            };
                            readonly allowSms: {
                                readonly type: "boolean";
                            };
                            readonly allowReportsAccess: {
                                readonly type: "boolean";
                            };
                            readonly allowAssetsAccess: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthRequired: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthAuthorizer: {
                                readonly type: "boolean";
                            };
                            readonly workOrderRequired: {
                                readonly type: "boolean";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly isLockedOut: {
                                readonly type: "boolean";
                            };
                            readonly localeId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly timeZone: {
                                readonly type: "string";
                            };
                            readonly loginDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly requiresTransferApproval: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly hasPin: {
                                readonly type: "boolean";
                            };
                            readonly allowOnBehalfOf: {
                                readonly type: "boolean";
                            };
                            readonly externalIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly typeName: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UserGetbyuseraccessgroupidId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The user access group ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly userRoleTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["None", "User", "Admin", "Super"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userName: {
                                readonly type: "string";
                            };
                            readonly firstName: {
                                readonly type: "string";
                            };
                            readonly lastName: {
                                readonly type: "string";
                            };
                            readonly fullName: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly userRoleType: {
                                readonly enum: readonly ["None", "User", "Admin", "Super"];
                                readonly type: "string";
                                readonly description: "`None` `User` `Admin` `Super`";
                            };
                            readonly phone: {
                                readonly type: "string";
                            };
                            readonly email: {
                                readonly type: "string";
                            };
                            readonly allowEmail: {
                                readonly type: "boolean";
                            };
                            readonly allowSms: {
                                readonly type: "boolean";
                            };
                            readonly allowReportsAccess: {
                                readonly type: "boolean";
                            };
                            readonly allowAssetsAccess: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthRequired: {
                                readonly type: "boolean";
                            };
                            readonly dualAuthAuthorizer: {
                                readonly type: "boolean";
                            };
                            readonly workOrderRequired: {
                                readonly type: "boolean";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly isLockedOut: {
                                readonly type: "boolean";
                            };
                            readonly localeId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly timeZone: {
                                readonly type: "string";
                            };
                            readonly loginDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly requiresTransferApproval: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly hasPin: {
                                readonly type: "boolean";
                            };
                            readonly allowOnBehalfOf: {
                                readonly type: "boolean";
                            };
                            readonly externalIds: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly externalId: {
                                            readonly type: "string";
                                        };
                                        readonly typeName: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UserId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2Useraccessgroup: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly assetId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly systemId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly cabinetId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly processStepId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly includeAutoProvisions: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly userAccessGroupTypes: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalRecords: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly currentPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly firstPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly lastPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly nextPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly previousPage: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly type: {
                                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                                readonly type: "string";
                                readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly restrictAssetList: {
                                readonly type: "boolean";
                            };
                            readonly requireLoginAuth: {
                                readonly type: "boolean";
                            };
                            readonly allowRemoteAuth: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly loginAuthGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly externalAccessGroupId: {
                                readonly type: "string";
                            };
                            readonly isAutoProvisionedGroup: {
                                readonly type: "boolean";
                            };
                            readonly accessTimes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly userAccessGroupId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly day: {
                                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                            readonly type: "string";
                                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                        };
                                        readonly startTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly endTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly isDeletable: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UseraccessgroupGetbylist: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user access group IDs.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly type: {
                                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                                readonly type: "string";
                                readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly restrictAssetList: {
                                readonly type: "boolean";
                            };
                            readonly requireLoginAuth: {
                                readonly type: "boolean";
                            };
                            readonly allowRemoteAuth: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly loginAuthGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly externalAccessGroupId: {
                                readonly type: "string";
                            };
                            readonly isAutoProvisionedGroup: {
                                readonly type: "boolean";
                            };
                            readonly accessTimes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly userAccessGroupId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly day: {
                                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                            readonly type: "string";
                                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                        };
                                        readonly startTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly endTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly isDeletable: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UseraccessgroupGetbyuseridId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The user ID.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly guid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly type: {
                                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                                readonly type: "string";
                                readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly issueLimit: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly restrictAssetList: {
                                readonly type: "boolean";
                            };
                            readonly requireLoginAuth: {
                                readonly type: "boolean";
                            };
                            readonly allowRemoteAuth: {
                                readonly type: "boolean";
                            };
                            readonly active: {
                                readonly type: "boolean";
                            };
                            readonly createdDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly updatedDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly loginAuthGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly deleted: {
                                readonly type: "boolean";
                            };
                            readonly outDurationLimit: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly updateUserId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly externalAccessGroupId: {
                                readonly type: "string";
                            };
                            readonly isAutoProvisionedGroup: {
                                readonly type: "boolean";
                            };
                            readonly accessTimes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly userAccessGroupId: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly day: {
                                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                            readonly type: "string";
                                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                        };
                                        readonly startTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly endTime: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly isDeletable: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV2UseraccessgroupId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly type: {
                            readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                            readonly type: "string";
                            readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly restrictAssetList: {
                            readonly type: "boolean";
                        };
                        readonly requireLoginAuth: {
                            readonly type: "boolean";
                        };
                        readonly allowRemoteAuth: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly loginAuthGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly externalAccessGroupId: {
                            readonly type: "string";
                        };
                        readonly isAutoProvisionedGroup: {
                            readonly type: "boolean";
                        };
                        readonly accessTimes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly userAccessGroupId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly day: {
                                        readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                        readonly type: "string";
                                        readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                    };
                                    readonly startTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly endTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly isDeletable: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Accesstime: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly userAccessGroupId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly day: {
                readonly type: "string";
            };
            readonly accessTimeStartHour: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeStartMinute: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeEndHour: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeEndMinute: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userAccessGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly day: {
                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            readonly type: "string";
                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                        };
                        readonly startTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly endTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Asset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly assetType: {
                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                readonly type: "string";
            };
            readonly assetRegisteredType: {
                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                readonly type: "string";
            };
            readonly attributeValue1: {
                readonly type: "string";
            };
            readonly attributeValue2: {
                readonly type: "string";
            };
            readonly attributeValue3: {
                readonly type: "string";
            };
            readonly attributeValue4: {
                readonly type: "string";
            };
            readonly attributeValue5: {
                readonly type: "string";
            };
            readonly attributeValue6: {
                readonly type: "string";
            };
            readonly attributeValue7: {
                readonly type: "string";
            };
            readonly lotLocationId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly parkingSpaceId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly processStepId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly shieldedAsset: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly totalMileage: {
                readonly type: "number";
                readonly format: "double";
                readonly default: 0;
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly monthlyMileage: {
                readonly type: "number";
                readonly format: "double";
                readonly default: 0;
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly entrataPropertyUnitId: {
                readonly type: "string";
            };
            readonly parentAssetId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: any;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2AssetIdAttachfobNumber: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
                readonly number: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The FOB number.";
                };
            };
            readonly required: readonly ["id", "number"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2AssetIdDetachfob: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Authentication: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly username: {
                readonly type: "string";
            };
            readonly password: {
                readonly type: "string";
            };
            readonly deviceId: {
                readonly type: "string";
                readonly default: any;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly authenticationToken: {
                            readonly type: "string";
                        };
                        readonly refreshToken: {
                            readonly type: "string";
                        };
                        readonly role: {
                            readonly enum: readonly ["Invalid", "SuperAdmin", "Admin", "UserFull", "UserLimited", "UserNone"];
                            readonly type: "string";
                            readonly description: "`Invalid` `SuperAdmin` `Admin` `UserFull` `UserLimited` `UserNone`";
                        };
                        readonly requiresVerification: {
                            readonly type: "boolean";
                        };
                        readonly availableContactTypes: {
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly ["Invalid", "Email", "Sms", "ThirdPartyUtility"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Email` `Sms` `ThirdPartyUtility`";
                            };
                        };
                        readonly otpSetupData: {
                            readonly type: "string";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2AuthenticationRefreshtoken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly expiredJwtToken: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The expired JWT token.";
                };
                readonly refreshTokenValue: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The refresh token value.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly authenticationToken: {
                            readonly type: "string";
                        };
                        readonly refreshToken: {
                            readonly type: "string";
                        };
                        readonly role: {
                            readonly enum: readonly ["Invalid", "SuperAdmin", "Admin", "UserFull", "UserLimited", "UserNone"];
                            readonly type: "string";
                            readonly description: "`Invalid` `SuperAdmin` `Admin` `UserFull` `UserLimited` `UserNone`";
                        };
                        readonly requiresVerification: {
                            readonly type: "boolean";
                        };
                        readonly availableContactTypes: {
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly ["Invalid", "Email", "Sms", "ThirdPartyUtility"];
                                readonly type: "string";
                                readonly description: "`Invalid` `Email` `Sms` `ThirdPartyUtility`";
                            };
                        };
                        readonly otpSetupData: {
                            readonly type: "string";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Inventorysession: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly notes: {
                readonly type: "string";
            };
            readonly systemIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Started", "Finished"];
                            readonly type: "string";
                            readonly description: "`Started` `Finished`";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2InventorysessionIdSetfinished: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the inventory session to set as finished.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Started", "Finished"];
                            readonly type: "string";
                            readonly description: "`Started` `Finished`";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Inventorysessionscan: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly inventorySessionId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly scannedValue: {
                readonly type: "string";
            };
            readonly latitude: {
                readonly type: "number";
                readonly format: "double";
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly longitude: {
                readonly type: "number";
                readonly format: "double";
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly inventorySessionId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly scannedValue: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly isFound: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly scanDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Reservation: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly assetIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly userId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly startTime: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly endTime: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly issueReasonId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly notes: {
                readonly type: "string";
            };
            readonly multiUse: {
                readonly type: "boolean";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly confirmationSent: {
                            readonly type: "boolean";
                        };
                        readonly reminderSent: {
                            readonly type: "boolean";
                        };
                        readonly warningSent: {
                            readonly type: "boolean";
                        };
                        readonly expiredSent: {
                            readonly type: "boolean";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly multiUse: {
                            readonly type: "boolean";
                        };
                        readonly checkoutPin: {
                            readonly type: "string";
                        };
                        readonly checkinPin: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2ReservationQuickreserve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly assetId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly confirmationSent: {
                            readonly type: "boolean";
                        };
                        readonly reminderSent: {
                            readonly type: "boolean";
                        };
                        readonly warningSent: {
                            readonly type: "boolean";
                        };
                        readonly expiredSent: {
                            readonly type: "boolean";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly multiUse: {
                            readonly type: "boolean";
                        };
                        readonly checkoutPin: {
                            readonly type: "string";
                        };
                        readonly checkinPin: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2User: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly firstName: {
                readonly type: "string";
            };
            readonly lastName: {
                readonly type: "string";
            };
            readonly role: {
                readonly type: "string";
                readonly default: "None";
            };
            readonly phoneNumber: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
            };
            readonly allowEmail: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowSMS: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowReportAccess: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dualAuthRequired: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dualAuthAuthorizer: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly issueLimit: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly pin: {
                readonly type: "string";
            };
            readonly newPassword: {
                readonly type: "string";
            };
            readonly localeId: {
                readonly type: "string";
            };
            readonly preferredLocale: {
                readonly type: "string";
                readonly writeOnly: true;
                readonly deprecated: true;
            };
            readonly timeZone: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly allowAssetsAccess: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly requiresTransferApproval: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowOnBehalfOf: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly expireDate: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly workOrderRequired: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly isLockedOut: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dealerPlate: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly favoriteAsset: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly proximityCardId: {
                readonly type: "string";
            };
            readonly fobLoginId: {
                readonly type: "string";
            };
            readonly samlId: {
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2UserIdChangepassword: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly oldPassword: {
                readonly type: "string";
            };
            readonly newPassword: {
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV2Useraccessgroup: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly issueLimit: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly restrictAssetList: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly requireLoginAuth: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowRemoteAuth: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly loginAuthGroupId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: any;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly outDurationLimit: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly externalAccessGroupId: {
                readonly type: "string";
            };
            readonly userAccessGroupType: {
                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly type: {
                            readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                            readonly type: "string";
                            readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly restrictAssetList: {
                            readonly type: "boolean";
                        };
                        readonly requireLoginAuth: {
                            readonly type: "boolean";
                        };
                        readonly allowRemoteAuth: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly loginAuthGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly externalAccessGroupId: {
                            readonly type: "string";
                        };
                        readonly isAutoProvisionedGroup: {
                            readonly type: "boolean";
                        };
                        readonly accessTimes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly userAccessGroupId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly day: {
                                        readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                        readonly type: "string";
                                        readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                    };
                                    readonly startTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly endTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly isDeletable: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2AccesstimeId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly userAccessGroupId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly day: {
                readonly type: "string";
            };
            readonly accessTimeStartHour: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeStartMinute: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeEndHour: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly accessTimeEndMinute: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the access time to update.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userAccessGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly day: {
                            readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            readonly type: "string";
                            readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                        };
                        readonly startTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly endTime: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2AssetId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly assetType: {
                readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                readonly type: "string";
            };
            readonly assetRegisteredType: {
                readonly enum: readonly ["Any", "Registered", "Unregistered"];
                readonly type: "string";
            };
            readonly attributeValue1: {
                readonly type: "string";
            };
            readonly attributeValue2: {
                readonly type: "string";
            };
            readonly attributeValue3: {
                readonly type: "string";
            };
            readonly attributeValue4: {
                readonly type: "string";
            };
            readonly attributeValue5: {
                readonly type: "string";
            };
            readonly attributeValue6: {
                readonly type: "string";
            };
            readonly attributeValue7: {
                readonly type: "string";
            };
            readonly lotLocationId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly parkingSpaceId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly processStepId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly shieldedAsset: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly totalMileage: {
                readonly type: "number";
                readonly format: "double";
                readonly default: 0;
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly monthlyMileage: {
                readonly type: "number";
                readonly format: "double";
                readonly default: 0;
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly entrataPropertyUnitId: {
                readonly type: "string";
            };
            readonly parentAssetId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: any;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the asset.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly systemId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cabinetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly type: {
                            readonly enum: readonly ["Invalid", "Asset", "DealerPlate", "SpareKey"];
                            readonly type: "string";
                            readonly description: "`Invalid` `Asset` `DealerPlate` `SpareKey`";
                        };
                        readonly statusType: {
                            readonly enum: readonly ["Any", "In", "Out", "Overdue"];
                            readonly type: "string";
                            readonly description: "`Any` `In` `Out` `Overdue`";
                        };
                        readonly registrationType: {
                            readonly enum: readonly ["Any", "Registered", "Unregistered"];
                            readonly type: "string";
                            readonly description: "`Any` `Registered` `Unregistered`";
                        };
                        readonly attributeKey1: {
                            readonly type: "string";
                        };
                        readonly attributeValue1: {
                            readonly type: "string";
                        };
                        readonly attributeKey2: {
                            readonly type: "string";
                        };
                        readonly attributeValue2: {
                            readonly type: "string";
                        };
                        readonly attributeKey3: {
                            readonly type: "string";
                        };
                        readonly attributeValue3: {
                            readonly type: "string";
                        };
                        readonly attributeKey4: {
                            readonly type: "string";
                        };
                        readonly attributeValue4: {
                            readonly type: "string";
                        };
                        readonly attributeKey5: {
                            readonly type: "string";
                        };
                        readonly attributeValue5: {
                            readonly type: "string";
                        };
                        readonly attributeKey6: {
                            readonly type: "string";
                        };
                        readonly attributeValue6: {
                            readonly type: "string";
                        };
                        readonly attributeKey7: {
                            readonly type: "string";
                        };
                        readonly attributeValue7: {
                            readonly type: "string";
                        };
                        readonly fobNumber: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly shielded: {
                            readonly type: "boolean";
                        };
                        readonly totalMileage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly checkoutDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly lotLocationId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parkingSpaceId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly processStepId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly parentAssetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reservationAssetIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly onBehalfOfUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2Inventorysessionscan: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly inventorySessionId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly scannedValue: {
                readonly type: "string";
            };
            readonly latitude: {
                readonly type: "number";
                readonly format: "double";
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
            readonly longitude: {
                readonly type: "number";
                readonly format: "double";
                readonly minimum: -1.7976931348623157e+308;
                readonly maximum: 1.7976931348623157e+308;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly inventorySessionId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly assetId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly scannedValue: {
                            readonly type: "string";
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly isFound: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly scanDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2ReservationId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly assetIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly userId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly startTime: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly endTime: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly issueReasonId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly notes: {
                readonly type: "string";
            };
            readonly multiUse: {
                readonly type: "boolean";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the reservation.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly userId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly endTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly issueReasonId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly notes: {
                            readonly type: "string";
                        };
                        readonly confirmationSent: {
                            readonly type: "boolean";
                        };
                        readonly reminderSent: {
                            readonly type: "boolean";
                        };
                        readonly warningSent: {
                            readonly type: "boolean";
                        };
                        readonly expiredSent: {
                            readonly type: "boolean";
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly multiUse: {
                            readonly type: "boolean";
                        };
                        readonly checkoutPin: {
                            readonly type: "string";
                        };
                        readonly checkinPin: {
                            readonly type: "string";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UserId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly firstName: {
                readonly type: "string";
            };
            readonly lastName: {
                readonly type: "string";
            };
            readonly role: {
                readonly type: "string";
                readonly default: "None";
            };
            readonly phoneNumber: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
            };
            readonly allowEmail: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowSMS: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowReportAccess: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dualAuthRequired: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dualAuthAuthorizer: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly issueLimit: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly pin: {
                readonly type: "string";
            };
            readonly newPassword: {
                readonly type: "string";
            };
            readonly localeId: {
                readonly type: "string";
            };
            readonly preferredLocale: {
                readonly type: "string";
                readonly writeOnly: true;
                readonly deprecated: true;
            };
            readonly timeZone: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly allowAssetsAccess: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly requiresTransferApproval: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowOnBehalfOf: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly expireDate: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly workOrderRequired: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly isLockedOut: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly dealerPlate: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly favoriteAsset: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: 0;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly proximityCardId: {
                readonly type: "string";
            };
            readonly fobLoginId: {
                readonly type: "string";
            };
            readonly samlId: {
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly userName: {
                            readonly type: "string";
                        };
                        readonly firstName: {
                            readonly type: "string";
                        };
                        readonly lastName: {
                            readonly type: "string";
                        };
                        readonly fullName: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly userRoleType: {
                            readonly enum: readonly ["None", "User", "Admin", "Super"];
                            readonly type: "string";
                            readonly description: "`None` `User` `Admin` `Super`";
                        };
                        readonly phone: {
                            readonly type: "string";
                        };
                        readonly email: {
                            readonly type: "string";
                        };
                        readonly allowEmail: {
                            readonly type: "boolean";
                        };
                        readonly allowSms: {
                            readonly type: "boolean";
                        };
                        readonly allowReportsAccess: {
                            readonly type: "boolean";
                        };
                        readonly allowAssetsAccess: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthRequired: {
                            readonly type: "boolean";
                        };
                        readonly dualAuthAuthorizer: {
                            readonly type: "boolean";
                        };
                        readonly workOrderRequired: {
                            readonly type: "boolean";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly isLockedOut: {
                            readonly type: "boolean";
                        };
                        readonly localeId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly timeZone: {
                            readonly type: "string";
                        };
                        readonly loginDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly requiresTransferApproval: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly hasPin: {
                            readonly type: "boolean";
                        };
                        readonly allowOnBehalfOf: {
                            readonly type: "boolean";
                        };
                        readonly externalIds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly externalId: {
                                        readonly type: "string";
                                    };
                                    readonly typeName: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly issueLimit: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly restrictAssetList: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly requireLoginAuth: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly allowRemoteAuth: {
                readonly type: "boolean";
                readonly default: false;
            };
            readonly loginAuthGroupId: {
                readonly type: "integer";
                readonly format: "int32";
                readonly default: any;
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly outDurationLimit: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly externalAccessGroupId: {
                readonly type: "string";
            };
            readonly userAccessGroupType: {
                readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly guid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly type: {
                            readonly enum: readonly ["Any", "Standard", "DefaultDealerPlate", "DealerPlateUserOneToOne", "ProcessStep"];
                            readonly type: "string";
                            readonly description: "`Any` `Standard` `DefaultDealerPlate` `DealerPlateUserOneToOne` `ProcessStep`";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly issueLimit: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly restrictAssetList: {
                            readonly type: "boolean";
                        };
                        readonly requireLoginAuth: {
                            readonly type: "boolean";
                        };
                        readonly allowRemoteAuth: {
                            readonly type: "boolean";
                        };
                        readonly active: {
                            readonly type: "boolean";
                        };
                        readonly createdDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly updatedDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly loginAuthGroupId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly deleted: {
                            readonly type: "boolean";
                        };
                        readonly outDurationLimit: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly updateUserId: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly externalAccessGroupId: {
                            readonly type: "string";
                        };
                        readonly isAutoProvisionedGroup: {
                            readonly type: "boolean";
                        };
                        readonly accessTimes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly userAccessGroupId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly day: {
                                        readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                        readonly type: "string";
                                        readonly description: "`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                    };
                                    readonly startTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly endTime: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly isDeletable: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdAssignassets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly assetId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of asset IDs to assign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdAssigncabinets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cabinetId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of cabinet IDs to assign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdAssignsystems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly systemId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of system IDs to assign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdAssignusers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly userId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user IDs to assign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdUnassignassets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly assetId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of asset IDs to unassign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly assetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdUnassigncabinets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cabinetId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of cabinet IDs to unassign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly cabinetId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdUnassignsystems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly systemId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of system IDs to unassign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly systemId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutApiV2UseraccessgroupIdUnassignusers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the user access group.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly userId: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of user IDs to unassign.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly userAccessGroupId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly userId: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.5.1"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [400];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Bad Request"];
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource"];
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["InvalidProperty"];
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly examples: readonly ["'The value for the property 'StatusType' is invalid."];
                            };
                            readonly propertyName: {
                                readonly type: "string";
                                readonly examples: readonly ["StatusType"];
                            };
                            readonly attemptedValue: {};
                            readonly validValues: {};
                        };
                        readonly additionalProperties: false;
                    };
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly examples: readonly ["https://tools.ietf.org/html/rfc7231#section-6.6.1"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["Internal Server Error"];
                };
                readonly status: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly examples: readonly [500];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly detail: {
                    readonly type: "string";
                };
                readonly instance: {
                    readonly type: "string";
                    readonly examples: readonly ["/api/v2/Resource/1"];
                };
            };
            readonly additionalProperties: true;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteApiV2AccesstimeDeletebylist, DeleteApiV2AssetDeletebylist, DeleteApiV2AssetId, DeleteApiV2InventorysessionId, DeleteApiV2InventorysessionscanId, DeleteApiV2ReservationId, DeleteApiV2UserDeletebylist, DeleteApiV2UserId, DeleteApiV2UseraccessgroupDeletebylist, DeleteApiV2UseraccessgroupId, GetApiV2AccesstimeId, GetApiV2Asset, GetApiV2AssetGetbyfobserialnumberSerialnumber, GetApiV2AssetGetbyfobtagTag, GetApiV2AssetGetbylist, GetApiV2AssetGetbyparentassetidId, GetApiV2AssetGetbyuseraccessgroupidId, GetApiV2AssetGetbyuseridId, GetApiV2AssetId, GetApiV2Assetlog, GetApiV2AssetlogId, GetApiV2Assettransaction, GetApiV2AssettransactionGetbylist, GetApiV2AssettransactionId, GetApiV2Attributecollection, GetApiV2Attributes, GetApiV2AttributesId, GetApiV2Fob, GetApiV2FobGetallUnattachedfobs, GetApiV2FobGetbylist, GetApiV2FobGetbylistFobnumbers, GetApiV2FobId, GetApiV2Healthcheck, GetApiV2Inventorysession, GetApiV2InventorysessionGetbylist, GetApiV2InventorysessionGetbyuseridId, GetApiV2InventorysessionId, GetApiV2Inventorysessionscan, GetApiV2InventorysessionscanGetbyinventorysessionidId, GetApiV2InventorysessionscanGetbyinventorysessionidIdScannedvalueValue, GetApiV2InventorysessionscanId, GetApiV2Issuereason, GetApiV2IssuereasonId, GetApiV2Lotlocation, GetApiV2LotlocationGetbylist, GetApiV2LotlocationId, GetApiV2Parkingspace, GetApiV2ParkingspaceGetbylist, GetApiV2ParkingspaceId, GetApiV2Processstep, GetApiV2ProcessstepGetbylist, GetApiV2ProcessstepId, GetApiV2Reservation, GetApiV2ReservationGetbylist, GetApiV2ReservationGetbyuseridId, GetApiV2ReservationId, GetApiV2ReservationassetGetbyreservationidId, GetApiV2SocketmapGetallbycabinetidId, GetApiV2System, GetApiV2SystemGetbylist, GetApiV2SystemGetbyuseraccessgroupidId, GetApiV2SystemId, GetApiV2User, GetApiV2UserGetbyexternalidId, GetApiV2UserGetbylist, GetApiV2UserGetbyuseraccessgroupidId, GetApiV2UserId, GetApiV2Useraccessgroup, GetApiV2UseraccessgroupGetbylist, GetApiV2UseraccessgroupGetbyuseridId, GetApiV2UseraccessgroupId, PostApiV2Accesstime, PostApiV2Asset, PostApiV2AssetIdAttachfobNumber, PostApiV2AssetIdDetachfob, PostApiV2Authentication, PostApiV2AuthenticationRefreshtoken, PostApiV2Inventorysession, PostApiV2InventorysessionIdSetfinished, PostApiV2Inventorysessionscan, PostApiV2Reservation, PostApiV2ReservationQuickreserve, PostApiV2User, PostApiV2UserIdChangepassword, PostApiV2Useraccessgroup, PutApiV2AccesstimeId, PutApiV2AssetId, PutApiV2Inventorysessionscan, PutApiV2ReservationId, PutApiV2UserId, PutApiV2UseraccessgroupId, PutApiV2UseraccessgroupIdAssignassets, PutApiV2UseraccessgroupIdAssigncabinets, PutApiV2UseraccessgroupIdAssignsystems, PutApiV2UseraccessgroupIdAssignusers, PutApiV2UseraccessgroupIdUnassignassets, PutApiV2UseraccessgroupIdUnassigncabinets, PutApiV2UseraccessgroupIdUnassignsystems, PutApiV2UseraccessgroupIdUnassignusers };

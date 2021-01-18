// Copyright 2016-2020, Pulumi Corporation.  All rights reserved.

import * as aws from "@pulumi/aws";
import * as policy from "@pulumi/policy";
import * as pulumi from "@pulumi/pulumi";

const stackPolicy: policy.StackValidationPolicy = {
    name: "lambda-test",
    description: "Lambda integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const lambdaFunctions = args.resources.filter(r => r.isType(aws.lambda.Function));
        if (lambdaFunctions.length < 1) {
            reportViolation(`Expected at least one lambda function but found ${lambdaFunctions.length}`);
            return;
        } else {
            lambdaFunctions.forEach(func => {
                console.log('Fund functions: ' + func.name)
            });
        }
    },
}

const tests = new policy.PolicyPack("tests-pack", {
    policies: [stackPolicy],
});

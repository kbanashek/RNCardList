/**
 * @generated SignedSource<<86fa7a5550f9018043ed20749c9ec360>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ImageKey = "griffey" | "jeter" | "jones" | "ripken" | "sosa" | "%future added value";
export type GetCardQuery$variables = {
  id: string;
};
export type GetCardQuery$data = {
  readonly card: {
    readonly description: string;
    readonly id: string;
    readonly imageKey: ImageKey;
    readonly isLiked: boolean;
    readonly name: string;
    readonly team: string;
    readonly year: number;
  } | null | undefined;
};
export type GetCardQuery = {
  response: GetCardQuery$data;
  variables: GetCardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Card",
    "kind": "LinkedField",
    "name": "card",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "year",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "team",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "imageKey",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isLiked",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCardQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCardQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eec23c3e9b04c70d7ccbc93ee17a226c",
    "id": null,
    "metadata": {},
    "name": "GetCardQuery",
    "operationKind": "query",
    "text": "query GetCardQuery(\n  $id: ID!\n) {\n  card(id: $id) {\n    id\n    name\n    year\n    team\n    description\n    imageKey\n    isLiked\n  }\n}\n"
  }
};
})();

(node as any).hash = "804a09e05aed2d2ed4335c3cd13dccea";

export default node;

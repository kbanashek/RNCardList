/**
 * @generated SignedSource<<77829b84a22aa82b87fd3c4a6dbcba70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ImageKey = "griffey" | "jeter" | "jones" | "ripken" | "sosa" | "%future added value";
export type GetCardsQuery$variables = Record<PropertyKey, never>;
export type GetCardsQuery$data = {
  readonly cards: ReadonlyArray<{
    readonly description: string;
    readonly id: string;
    readonly imageKey: ImageKey;
    readonly isLiked: boolean;
    readonly name: string;
    readonly team: string;
    readonly year: number;
  }>;
};
export type GetCardsQuery = {
  response: GetCardsQuery$data;
  variables: GetCardsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Card",
    "kind": "LinkedField",
    "name": "cards",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCardsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetCardsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6b821431915a8f0d258b75492af7ca65",
    "id": null,
    "metadata": {},
    "name": "GetCardsQuery",
    "operationKind": "query",
    "text": "query GetCardsQuery {\n  cards {\n    id\n    name\n    year\n    team\n    description\n    imageKey\n    isLiked\n  }\n}\n"
  }
};
})();

(node as any).hash = "238b0a095675b4064b4f5675420ad113";

export default node;

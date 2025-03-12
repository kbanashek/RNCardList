/**
 * @generated SignedSource<<9968ba4ed89b7eea985c6fad28dfef3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CardListQuery$variables = Record<PropertyKey, never>;
export type CardListQuery$data = {
  readonly cards: ReadonlyArray<{
    readonly description: string;
    readonly id: string;
    readonly imageKey: string;
    readonly isLiked: boolean;
    readonly name: string;
    readonly team: string;
    readonly year: number;
  }>;
};
export type CardListQuery = {
  response: CardListQuery$data;
  variables: CardListQuery$variables;
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
    "name": "CardListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CardListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "84a37e001358238dd4f16a60dbb9400f",
    "id": null,
    "metadata": {},
    "name": "CardListQuery",
    "operationKind": "query",
    "text": "query CardListQuery {\n  cards {\n    id\n    name\n    year\n    team\n    description\n    imageKey\n    isLiked\n  }\n}\n"
  }
};
})();

(node as any).hash = "041c9d66426e8d7b62e81adb8850e9a9";

export default node;

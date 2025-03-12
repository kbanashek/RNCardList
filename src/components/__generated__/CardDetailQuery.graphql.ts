/**
 * @generated SignedSource<<90956c07df0f05117489565955ee54af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CardDetailQuery$variables = {
  id: string;
};
export type CardDetailQuery$data = {
  readonly card: {
    readonly description: string;
    readonly id: string;
    readonly imageKey: string;
    readonly isLiked: boolean;
    readonly name: string;
    readonly team: string;
    readonly year: number;
  } | null | undefined;
};
export type CardDetailQuery = {
  response: CardDetailQuery$data;
  variables: CardDetailQuery$variables;
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
    "name": "CardDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CardDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f71af64b8c99c0babec826eb6e70110c",
    "id": null,
    "metadata": {},
    "name": "CardDetailQuery",
    "operationKind": "query",
    "text": "query CardDetailQuery(\n  $id: ID!\n) {\n  card(id: $id) {\n    id\n    name\n    year\n    team\n    description\n    imageKey\n    isLiked\n  }\n}\n"
  }
};
})();

(node as any).hash = "3010f9825258570871e4aa61977d583b";

export default node;

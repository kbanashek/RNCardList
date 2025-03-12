/**
 * @generated SignedSource<<d4accbf5378bb2429bdeeee2dd40bdf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ToggleCardLikeInput = {
  cardId: string;
};
export type ToggleCardLikeMutation$variables = {
  input: ToggleCardLikeInput;
};
export type ToggleCardLikeMutation$data = {
  readonly toggleCardLike: {
    readonly card: {
      readonly id: string;
      readonly isLiked: boolean;
    } | null | undefined;
  };
};
export type ToggleCardLikeMutation = {
  response: ToggleCardLikeMutation$data;
  variables: ToggleCardLikeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ToggleCardLikePayload",
    "kind": "LinkedField",
    "name": "toggleCardLike",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
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
            "name": "isLiked",
            "storageKey": null
          }
        ],
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
    "name": "ToggleCardLikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ToggleCardLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "60991fd539562fd6170631abece6a4de",
    "id": null,
    "metadata": {},
    "name": "ToggleCardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation ToggleCardLikeMutation(\n  $input: ToggleCardLikeInput!\n) {\n  toggleCardLike(input: $input) {\n    card {\n      id\n      isLiked\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2fce74b4339092abb7cdeaba83e9c6ce";

export default node;

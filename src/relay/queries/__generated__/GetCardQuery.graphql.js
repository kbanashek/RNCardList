/**
 * @generated SignedSource<<074147087558787543bc7a4672c67c98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
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
        "name": "title",
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
        "name": "content",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "imageUrl",
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
    "cacheID": "9a76e755e0bc5111de09b2c2214cde0a",
    "id": null,
    "metadata": {},
    "name": "GetCardQuery",
    "operationKind": "query",
    "text": "query GetCardQuery(\n  $id: ID!\n) {\n  card(id: $id) {\n    id\n    title\n    description\n    content\n    imageUrl\n  }\n}\n"
  }
};
})();

node.hash = "515ef73275df2bd01f0f0000b450cc66";

module.exports = node;

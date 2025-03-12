/**
 * @generated SignedSource<<c76a11d7f9a3c703492fc8daf861fed5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
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
        "name": "imageUrl",
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
    "cacheID": "1233e4187f81949f407e771650949f08",
    "id": null,
    "metadata": {},
    "name": "GetCardsQuery",
    "operationKind": "query",
    "text": "query GetCardsQuery {\n  cards {\n    id\n    title\n    description\n    imageUrl\n  }\n}\n"
  }
};
})();

node.hash = "5a91f0eb94f8061c9c41af666a898fb0";

module.exports = node;

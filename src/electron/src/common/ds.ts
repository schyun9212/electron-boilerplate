export type Set<T, F> = [T, F];

export interface TreeNode<T> {
  id: number;
  parent: TreeNode<T> | null;
  readonly children: TreeNode<T>[];

  addChild(node: TreeNode<T>): number;
  removeChild(id: number): void;
}

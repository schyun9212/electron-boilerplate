export type Set<T, F> = [T, F];

export interface TreeNode<T> {
  parent: TreeNode<T> | null;
  readonly children: TreeNode<T>[];
}

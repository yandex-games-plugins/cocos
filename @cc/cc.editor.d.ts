declare module "cc/editor/animation-clip-migration" {
  export import AnimationClipLegacyData = AnimationClip._legacy.AnimationClipLegacyData;
  import { AnimationClip } from "cc";
  export {};
}
declare module "cc/editor/color-utils" {
  export function linearToSrgb8Bit(x: number): number;
  export function srgbToLinear(x: number): number;
  export {};
}
declare module "cc/editor/custom-pipeline" {
  export function reindexEdgeList(el: (OutE | OutEP)[], u: number): void;
  export function removeAllEdgesFromList(
    edges: Set<Edge>,
    el: OutEP[],
    v: vertex_descriptor
  ): void;
  export function getPath(
    g: ReferenceGraph & NamedGraph,
    v: vertex_descriptor | null
  ): string;
  export function findRelative(
    g: ParentGraph,
    v: vertex_descriptor | null,
    path: string
  ): vertex_descriptor | null;
  export function depthFirstSearch(
    g: IncidenceGraph & VertexListGraph,
    visitor: GraphVisitor,
    color: MutableVertexPropertyMap<GraphColor>,
    startVertex?: vertex_descriptor | null
  ): void;
  export function depthFirstVisit(
    g: IncidenceGraph,
    u: vertex_descriptor,
    visitor: GraphVisitor,
    color: MutableVertexPropertyMap<GraphColor>,
    func?: TerminatorFunc
  ): void;
  /****************************************************************************
   Copyright (c) 2021-2023 Xiamen Yaji Software Co., Ltd.
  
   http://www.cocos.com
  
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights to
   use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
   of the Software, and to permit persons to whom the Software is furnished to do so,
   subject to the following conditions:
  
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
  
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
   ****************************************************************************/
  export const enum directional {
    undirected = 0,
    directed = 1,
    bidirectional = 2,
  }
  export const enum parallel {
    disallow = 0,
    allow = 1,
  }
  export const enum traversal {
    none = 0,
    incidence = 1,
    bidirectional = 2,
    adjacency = 4,
    vertex_list = 8,
    edge_list = 16,
  }
  export interface Vertex {
    nullVertex(): Vertex | null;
  }
  export type vertex_descriptor = number | Vertex;
  export interface Edge {
    getProperty(): unknown;
    source: vertex_descriptor;
    target: vertex_descriptor;
  }
  export class ED {
    constructor(source: vertex_descriptor, target: vertex_descriptor);
    equals(rhs: ED): boolean;
    source: vertex_descriptor;
    target: vertex_descriptor;
  }
  export class EPD {
    constructor(
      source: vertex_descriptor,
      target: vertex_descriptor,
      edge: Edge
    );
    equals(rhs: EPD): boolean;
    source: vertex_descriptor;
    target: vertex_descriptor;
    readonly edge: Edge;
  }
  export type edge_descriptor = ED | EPD;
  export class OutE {
    constructor(target: vertex_descriptor);
    equals(rhs: OutE): boolean;
    target: vertex_descriptor;
  }
  export class OutEP {
    constructor(target: vertex_descriptor, edge: Edge);
    equals(rhs: OutEP): boolean;
    getProperty(): unknown;
    target: vertex_descriptor;
    readonly edge: Edge;
  }
  export class OutEI implements IterableIterator<ED> {
    constructor(iterator: IterableIterator<OutE>, source: vertex_descriptor);
    [Symbol.iterator](): this;
    next(): IteratorResult<ED>;
    readonly iterator: IterableIterator<OutE>;
    readonly source: vertex_descriptor;
  }
  export class OutEPI implements IterableIterator<EPD> {
    constructor(iterator: IterableIterator<OutEP>, source: vertex_descriptor);
    [Symbol.iterator](): this;
    next(): IteratorResult<EPD>;
    readonly iterator: IterableIterator<OutEP>;
    readonly source: vertex_descriptor;
  }
  export type out_edge_iterator = OutEI | OutEPI;
  export class InEI implements IterableIterator<ED> {
    constructor(iterator: IterableIterator<OutE>, source: vertex_descriptor);
    [Symbol.iterator](): this;
    next(): IteratorResult<ED>;
    readonly iterator: IterableIterator<OutE>;
    readonly source: vertex_descriptor;
  }
  export class InEPI implements IterableIterator<EPD> {
    constructor(iterator: IterableIterator<OutEP>, source: vertex_descriptor);
    [Symbol.iterator](): this;
    next(): IteratorResult<EPD>;
    readonly iterator: IterableIterator<OutEP>;
    readonly source: vertex_descriptor;
  }
  export type in_edge_iterator = InEI | InEPI;
  export interface Graph {
    readonly directed_category: directional;
    readonly edge_parallel_category: parallel;
    readonly traversal_category: traversal;
    nullVertex(): vertex_descriptor | null;
  }
  export interface IncidenceGraph extends Graph {
    edge(u: vertex_descriptor, v: vertex_descriptor): boolean;
    source(e: edge_descriptor): vertex_descriptor;
    target(e: edge_descriptor): vertex_descriptor;
    outEdges(v: vertex_descriptor): out_edge_iterator;
    outDegree(v: vertex_descriptor): number;
  }
  export interface BidirectionalGraph extends IncidenceGraph {
    inEdges(v: vertex_descriptor): in_edge_iterator;
    inDegree(v: vertex_descriptor): number;
    degree(v: vertex_descriptor): number;
  }
  export class AdjI implements IterableIterator<vertex_descriptor> {
    constructor(graph: IncidenceGraph, iterator: OutEI);
    [Symbol.iterator](): this;
    next(): IteratorResult<vertex_descriptor>;
    readonly graph: IncidenceGraph;
    readonly iterator: OutEI;
  }
  export class AdjPI implements IterableIterator<vertex_descriptor> {
    constructor(graph: IncidenceGraph, iterator: OutEPI);
    [Symbol.iterator](): this;
    next(): IteratorResult<vertex_descriptor>;
    readonly graph: IncidenceGraph;
    readonly iterator: OutEPI;
  }
  export type adjacency_iterator = AdjI | AdjPI;
  export interface AdjacencyGraph extends Graph {
    adjacentVertices(v: vertex_descriptor): adjacency_iterator;
  }
  export interface VertexListGraph extends Graph {
    vertices(): IterableIterator<vertex_descriptor>;
    numVertices(): number;
  }
  export interface EdgeListGraph extends Graph {
    edges(): IterableIterator<edge_descriptor>;
    numEdges(): number;
    source(e: edge_descriptor): vertex_descriptor;
    target(e: edge_descriptor): vertex_descriptor;
  }
  export interface MutableGraph extends Graph {
    addVertex(...args: any[]): vertex_descriptor;
    clearVertex(v: vertex_descriptor): void;
    removeVertex(v: vertex_descriptor): void;
    addEdge(
      u: vertex_descriptor,
      v: vertex_descriptor,
      p?: unknown
    ): edge_descriptor | null;
    removeEdges(u: vertex_descriptor, v: vertex_descriptor): void;
    removeEdge(e: edge_descriptor): void;
  }
  export interface PropertyMap {
    get(x: vertex_descriptor | edge_descriptor): unknown;
  }
  export interface MutableVertexPropertyMap<T> extends PropertyMap {
    put(x: vertex_descriptor, value: T): void;
  }
  export interface PropertyGraph extends Graph {
    get(tag: string): PropertyMap;
  }
  export interface NamedGraph extends Graph {
    vertexName(v: vertex_descriptor): string;
    vertexNameMap(): PropertyMap;
  }
  export interface ComponentGraph extends Graph {
    readonly components: string[];
    component(id: number, v: vertex_descriptor): unknown;
    componentMap(id: number): unknown;
  }
  export interface PolymorphicGraph extends Graph {
    holds(id: number, v: vertex_descriptor): boolean;
    id(v: vertex_descriptor): number;
    object(v: vertex_descriptor): unknown;
    value(id: number, v: vertex_descriptor): unknown;
    tryValue(id: number, v: vertex_descriptor): unknown;
    visitVertex(visitor: unknown, v: vertex_descriptor): void;
  }
  export type reference_descriptor = ED | EPD;
  export type child_iterator = OutEI | OutEPI;
  export type parent_iterator = InEI | InEPI;
  export interface ReferenceGraph extends Graph {
    reference(u: vertex_descriptor, v: vertex_descriptor): boolean;
    parent(e: reference_descriptor): vertex_descriptor;
    child(e: reference_descriptor): vertex_descriptor;
    parents(v: vertex_descriptor): parent_iterator;
    children(v: vertex_descriptor): child_iterator;
    numParents(v: vertex_descriptor): number;
    numChildren(v: vertex_descriptor): number;
    getParent(v: vertex_descriptor): vertex_descriptor | null;
    isAncestor(
      ancestor: vertex_descriptor,
      descendent: vertex_descriptor
    ): boolean;
  }
  export interface MutableReferenceGraph extends ReferenceGraph {
    addReference(
      u: vertex_descriptor,
      v: vertex_descriptor,
      p?: unknown
    ): reference_descriptor | null;
    removeReference(e: reference_descriptor): void;
    removeReferences(u: vertex_descriptor, v: vertex_descriptor): void;
  }
  export interface ParentGraph extends ReferenceGraph, NamedGraph {
    locateChild(
      v: vertex_descriptor | null,
      name: string
    ): vertex_descriptor | null;
  }
  export interface AddressableGraph extends ParentGraph {
    addressable(absPath: string): boolean;
    locate(absPath: string): vertex_descriptor | null;
    locateRelative(
      path: string,
      start?: vertex_descriptor | null
    ): vertex_descriptor | null;
    path(v: vertex_descriptor): string;
  }
  export interface UuidGraph<Key> extends Graph {
    contains(key: Key): boolean;
    vertex(key: Key): vertex_descriptor;
    find(key: Key): vertex_descriptor | null;
  }
  export interface TerminatorFunc {
    terminate(v: vertex_descriptor, g: IncidenceGraph): boolean;
  }
  export interface GraphVisitor {
    initializeVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    startVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    discoverVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    examineEdge(e: edge_descriptor, g: IncidenceGraph): void;
    treeEdge(e: edge_descriptor, g: IncidenceGraph): void;
    backEdge(e: edge_descriptor, g: IncidenceGraph): void;
    forwardOrCrossEdge(e: edge_descriptor, g: IncidenceGraph): void;
    finishEdge(e: edge_descriptor, g: IncidenceGraph): void;
    finishVertex(v: vertex_descriptor, g: IncidenceGraph): void;
  }
  export enum GraphColor {
    WHITE = 0,
    GRAY = 1,
    GREEN = 2,
    RED = 3,
    BLACK = 4,
  }
  export class DefaultVisitor implements GraphVisitor {
    initializeVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    startVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    discoverVertex(v: vertex_descriptor, g: IncidenceGraph): void;
    examineEdge(e: edge_descriptor, g: IncidenceGraph): void;
    treeEdge(e: edge_descriptor, g: IncidenceGraph): void;
    backEdge(e: edge_descriptor, g: IncidenceGraph): void;
    forwardOrCrossEdge(e: edge_descriptor, g: IncidenceGraph): void;
    finishEdge(e: edge_descriptor, g: IncidenceGraph): void;
    finishVertex(v: vertex_descriptor, g: IncidenceGraph): void;
  }
  export class ReferenceGraphView<
    BaseGraph extends ReferenceGraph & VertexListGraph
  > implements IncidenceGraph, VertexListGraph
  {
    constructor(g: BaseGraph);
    nullVertex(): vertex_descriptor | null;
    edge(u: vertex_descriptor, v: vertex_descriptor): boolean;
    source(e: edge_descriptor): vertex_descriptor;
    target(e: edge_descriptor): vertex_descriptor;
    outEdges(v: vertex_descriptor): out_edge_iterator;
    outDegree(v: vertex_descriptor): number;
    vertices(): IterableIterator<vertex_descriptor>;
    numVertices(): number;
    readonly directed_category: directional;
    readonly edge_parallel_category: parallel;
    readonly traversal_category: traversal;
    g: BaseGraph;
  }
  export function getLayoutGraphValueName(e: LayoutGraphValue): string;
  export function getLayoutGraphDataValueName(e: LayoutGraphDataValue): string;
  export function saveDescriptorDB(
    ar: rendering.OutputArchive,
    v: DescriptorDB
  ): void;
  export function loadDescriptorDB(
    ar: rendering.InputArchive,
    v: DescriptorDB
  ): void;
  export function saveRenderPhase(
    ar: rendering.OutputArchive,
    v: RenderPhase
  ): void;
  export function loadRenderPhase(
    ar: rendering.InputArchive,
    v: RenderPhase
  ): void;
  export function saveLayoutGraph(
    ar: rendering.OutputArchive,
    g: LayoutGraph
  ): void;
  export function loadLayoutGraph(
    ar: rendering.InputArchive,
    g: LayoutGraph
  ): void;
  export function saveUniformData(
    ar: rendering.OutputArchive,
    v: UniformData
  ): void;
  export function loadUniformData(
    ar: rendering.InputArchive,
    v: UniformData
  ): void;
  export function saveUniformBlockData(
    ar: rendering.OutputArchive,
    v: UniformBlockData
  ): void;
  export function loadUniformBlockData(
    ar: rendering.InputArchive,
    v: UniformBlockData
  ): void;
  export function saveDescriptorData(
    ar: rendering.OutputArchive,
    v: DescriptorData
  ): void;
  export function loadDescriptorData(
    ar: rendering.InputArchive,
    v: DescriptorData
  ): void;
  export function saveDescriptorBlockData(
    ar: rendering.OutputArchive,
    v: DescriptorBlockData
  ): void;
  export function loadDescriptorBlockData(
    ar: rendering.InputArchive,
    v: DescriptorBlockData
  ): void;
  export function saveDescriptorSetLayoutData(
    ar: rendering.OutputArchive,
    v: DescriptorSetLayoutData
  ): void;
  export function loadDescriptorSetLayoutData(
    ar: rendering.InputArchive,
    v: DescriptorSetLayoutData
  ): void;
  export function saveDescriptorSetData(
    ar: rendering.OutputArchive,
    v: DescriptorSetData
  ): void;
  export function loadDescriptorSetData(
    ar: rendering.InputArchive,
    v: DescriptorSetData
  ): void;
  export function savePipelineLayoutData(
    ar: rendering.OutputArchive,
    v: PipelineLayoutData
  ): void;
  export function loadPipelineLayoutData(
    ar: rendering.InputArchive,
    v: PipelineLayoutData
  ): void;
  export function saveShaderBindingData(
    ar: rendering.OutputArchive,
    v: ShaderBindingData
  ): void;
  export function loadShaderBindingData(
    ar: rendering.InputArchive,
    v: ShaderBindingData
  ): void;
  export function saveShaderLayoutData(
    ar: rendering.OutputArchive,
    v: ShaderLayoutData
  ): void;
  export function loadShaderLayoutData(
    ar: rendering.InputArchive,
    v: ShaderLayoutData
  ): void;
  export function saveTechniqueData(
    ar: rendering.OutputArchive,
    v: TechniqueData
  ): void;
  export function loadTechniqueData(
    ar: rendering.InputArchive,
    v: TechniqueData
  ): void;
  export function saveEffectData(
    ar: rendering.OutputArchive,
    v: EffectData
  ): void;
  export function loadEffectData(
    ar: rendering.InputArchive,
    v: EffectData
  ): void;
  export function saveShaderProgramData(
    ar: rendering.OutputArchive,
    v: ShaderProgramData
  ): void;
  export function loadShaderProgramData(
    ar: rendering.InputArchive,
    v: ShaderProgramData
  ): void;
  export function saveRenderStageData(
    ar: rendering.OutputArchive,
    v: RenderStageData
  ): void;
  export function loadRenderStageData(
    ar: rendering.InputArchive,
    v: RenderStageData
  ): void;
  export function saveRenderPhaseData(
    ar: rendering.OutputArchive,
    v: RenderPhaseData
  ): void;
  export function loadRenderPhaseData(
    ar: rendering.InputArchive,
    v: RenderPhaseData
  ): void;
  export function saveLayoutGraphData(
    ar: rendering.OutputArchive,
    g: LayoutGraphData
  ): void;
  export function loadLayoutGraphData(
    ar: rendering.InputArchive,
    g: LayoutGraphData
  ): void;
  export class DescriptorDB {
    readonly blocks: Map<string, rendering.DescriptorBlock>;
  }
  export class RenderPhase {
    readonly shaders: Set<string>;
  }
  export const enum LayoutGraphValue {
    RenderStage = 0,
    RenderPhase = 1,
  }
  export interface LayoutGraphValueType {
    [LayoutGraphValue.RenderStage]: number;
    [LayoutGraphValue.RenderPhase]: RenderPhase;
  }
  export interface LayoutGraphVisitor {
    renderStage(value: number): unknown;
    renderPhase(value: RenderPhase): unknown;
  }
  export type LayoutGraphObject = number | RenderPhase;
  export class LayoutGraphVertex {
    readonly id: LayoutGraphValue;
    readonly object: LayoutGraphObject;
    constructor(id: LayoutGraphValue, object: LayoutGraphObject);
    readonly _outEdges: OutE[];
    readonly _inEdges: OutE[];
    readonly _id: LayoutGraphValue;
    _object: LayoutGraphObject;
  }
  export class LayoutGraphNameMap implements PropertyMap {
    readonly names: string[];
    constructor(names: string[]);
    get(v: number): string;
    readonly _names: string[];
  }
  export class LayoutGraphDescriptorsMap implements PropertyMap {
    readonly descriptors: DescriptorDB[];
    constructor(descriptors: DescriptorDB[]);
    get(v: number): DescriptorDB;
    readonly _descriptors: DescriptorDB[];
  }
  export const enum LayoutGraphComponent {
    Name = 0,
    Descriptors = 1,
  }
  export interface LayoutGraphComponentType {
    [LayoutGraphComponent.Name]: string;
    [LayoutGraphComponent.Descriptors]: DescriptorDB;
  }
  export interface LayoutGraphComponentPropertyMap {
    [LayoutGraphComponent.Name]: LayoutGraphNameMap;
    [LayoutGraphComponent.Descriptors]: LayoutGraphDescriptorsMap;
  }
  export class LayoutGraph
    implements
      BidirectionalGraph,
      AdjacencyGraph,
      VertexListGraph,
      MutableGraph,
      PropertyGraph,
      NamedGraph,
      ComponentGraph,
      PolymorphicGraph,
      ReferenceGraph,
      MutableReferenceGraph,
      AddressableGraph
  {
    nullVertex(): number;
    readonly directed_category: directional;
    readonly edge_parallel_category: parallel;
    readonly traversal_category: traversal;
    edge(u: number, v: number): boolean;
    source(e: ED): number;
    target(e: ED): number;
    outEdges(v: number): OutEI;
    outDegree(v: number): number;
    inEdges(v: number): InEI;
    inDegree(v: number): number;
    degree(v: number): number;
    adjacentVertices(v: number): AdjI;
    vertices(): IterableIterator<number>;
    numVertices(): number;
    numEdges(): number;
    clear(): void;
    addVertex<T extends LayoutGraphValue>(
      id: LayoutGraphValue,
      object: LayoutGraphValueType[T],
      name: string,
      descriptors: DescriptorDB,
      u?: number
    ): number;
    clearVertex(v: number): void;
    removeVertex(u: number): void;
    addEdge(u: number, v: number): ED | null;
    removeEdges(u: number, v: number): void;
    removeEdge(e: ED): void;
    vertexName(v: number): string;
    vertexNameMap(): LayoutGraphNameMap;
    get(tag: string): LayoutGraphNameMap | LayoutGraphDescriptorsMap;
    component<T extends LayoutGraphComponent>(
      id: T,
      v: number
    ): LayoutGraphComponentType[T];
    componentMap<T extends LayoutGraphComponent>(
      id: T
    ): LayoutGraphComponentPropertyMap[T];
    getName(v: number): string;
    getDescriptors(v: number): DescriptorDB;
    holds(id: LayoutGraphValue, v: number): boolean;
    id(v: number): LayoutGraphValue;
    object(v: number): LayoutGraphObject;
    value<T extends LayoutGraphValue>(
      id: T,
      v: number
    ): LayoutGraphValueType[T];
    tryValue<T extends LayoutGraphValue>(
      id: T,
      v: number
    ): LayoutGraphValueType[T] | null;
    visitVertex(visitor: LayoutGraphVisitor, v: number): unknown;
    getRenderStage(v: number): number;
    getRenderPhase(v: number): RenderPhase;
    tryGetRenderStage(v: number): number | null;
    tryGetRenderPhase(v: number): RenderPhase | null;
    reference(u: number, v: number): boolean;
    parent(e: ED): number;
    child(e: ED): number;
    parents(v: number): InEI;
    children(v: number): OutEI;
    numParents(v: number): number;
    numChildren(v: number): number;
    getParent(v: number): number;
    isAncestor(ancestor: number, descendent: number): boolean;
    addReference(u: number, v: number): ED | null;
    removeReference(e: ED): void;
    removeReferences(u: number, v: number): void;
    locateChild(u: number, name: string): number;
    addressable(absPath: string): boolean;
    locate(absPath: string): number;
    locateRelative(path: string, start?: number): number;
    path(v: number): string;
    readonly components: string[];
    readonly _vertices: LayoutGraphVertex[];
    readonly _names: string[];
    readonly _descriptors: DescriptorDB[];
  }
  export class UniformData {
    constructor(uniformID?: number, uniformType?: gfx.Type, offset?: number);
    uniformID: number;
    uniformType: gfx.Type;
    offset: number;
    size: number;
  }
  export class UniformBlockData {
    bufferSize: number;
    readonly uniforms: UniformData[];
  }
  export class DescriptorData {
    constructor(descriptorID?: number, type?: gfx.Type, count?: number);
    descriptorID: number;
    type: gfx.Type;
    count: number;
  }
  export class DescriptorBlockData {
    constructor(
      type?: rendering.DescriptorTypeOrder,
      visibility?: gfx.ShaderStageFlagBit,
      capacity?: number
    );
    type: rendering.DescriptorTypeOrder;
    visibility: gfx.ShaderStageFlagBit;
    offset: number;
    capacity: number;
    readonly descriptors: DescriptorData[];
  }
  export class DescriptorSetLayoutData {
    constructor(
      slot?: number,
      capacity?: number,
      descriptorBlocks?: DescriptorBlockData[],
      uniformBlocks?: Map<number, gfx.UniformBlock>,
      bindingMap?: Map<number, number>
    );
    slot: number;
    capacity: number;
    uniformBlockCapacity: number;
    samplerTextureCapacity: number;
    readonly descriptorBlocks: DescriptorBlockData[];
    readonly uniformBlocks: Map<number, gfx.UniformBlock>;
    readonly bindingMap: Map<number, number>;
  }
  export class DescriptorSetData {
    constructor(
      descriptorSetLayoutData?: DescriptorSetLayoutData,
      descriptorSetLayout?: gfx.DescriptorSetLayout | null,
      descriptorSet?: gfx.DescriptorSet | null
    );
    readonly descriptorSetLayoutData: DescriptorSetLayoutData;
    readonly descriptorSetLayoutInfo: gfx.DescriptorSetLayoutInfo;
    descriptorSetLayout: gfx.DescriptorSetLayout | null;
    descriptorSet: gfx.DescriptorSet | null;
  }
  export class PipelineLayoutData {
    readonly descriptorSets: Map<rendering.UpdateFrequency, DescriptorSetData>;
  }
  export class ShaderBindingData {
    readonly descriptorBindings: Map<number, number>;
  }
  export class ShaderLayoutData {
    readonly layoutData: Map<
      rendering.UpdateFrequency,
      DescriptorSetLayoutData
    >;
    readonly bindingData: Map<rendering.UpdateFrequency, ShaderBindingData>;
  }
  export class TechniqueData {
    readonly passes: ShaderLayoutData[];
  }
  export class EffectData {
    readonly techniques: Map<string, TechniqueData>;
  }
  export class ShaderProgramData {
    readonly layout: PipelineLayoutData;
    pipelineLayout: gfx.PipelineLayout | null;
  }
  export class RenderStageData {
    readonly descriptorVisibility: Map<number, gfx.ShaderStageFlagBit>;
  }
  export class RenderPhaseData {
    rootSignature: string;
    readonly shaderPrograms: ShaderProgramData[];
    readonly shaderIndex: Map<string, number>;
    pipelineLayout: gfx.PipelineLayout | null;
  }
  export const enum LayoutGraphDataValue {
    RenderStage = 0,
    RenderPhase = 1,
  }
  export interface LayoutGraphDataValueType {
    [LayoutGraphDataValue.RenderStage]: RenderStageData;
    [LayoutGraphDataValue.RenderPhase]: RenderPhaseData;
  }
  export interface LayoutGraphDataVisitor {
    renderStage(value: RenderStageData): unknown;
    renderPhase(value: RenderPhaseData): unknown;
  }
  export type LayoutGraphDataObject = RenderStageData | RenderPhaseData;
  export class LayoutGraphDataVertex {
    readonly id: LayoutGraphDataValue;
    readonly object: LayoutGraphDataObject;
    constructor(id: LayoutGraphDataValue, object: LayoutGraphDataObject);
    readonly _outEdges: OutE[];
    readonly _inEdges: OutE[];
    readonly _id: LayoutGraphDataValue;
    _object: LayoutGraphDataObject;
  }
  export class LayoutGraphDataNameMap implements PropertyMap {
    readonly names: string[];
    constructor(names: string[]);
    get(v: number): string;
    readonly _names: string[];
  }
  export class LayoutGraphDataUpdateMap implements PropertyMap {
    readonly updateFrequencies: rendering.UpdateFrequency[];
    constructor(updateFrequencies: rendering.UpdateFrequency[]);
    get(v: number): rendering.UpdateFrequency;
    set(v: number, updateFrequencies: rendering.UpdateFrequency): void;
    readonly _updateFrequencies: rendering.UpdateFrequency[];
  }
  export class LayoutGraphDataLayoutMap implements PropertyMap {
    readonly layouts: PipelineLayoutData[];
    constructor(layouts: PipelineLayoutData[]);
    get(v: number): PipelineLayoutData;
    readonly _layouts: PipelineLayoutData[];
  }
  export const enum LayoutGraphDataComponent {
    Name = 0,
    Update = 1,
    Layout = 2,
  }
  export interface LayoutGraphDataComponentType {
    [LayoutGraphDataComponent.Name]: string;
    [LayoutGraphDataComponent.Update]: rendering.UpdateFrequency;
    [LayoutGraphDataComponent.Layout]: PipelineLayoutData;
  }
  export interface LayoutGraphDataComponentPropertyMap {
    [LayoutGraphDataComponent.Name]: LayoutGraphDataNameMap;
    [LayoutGraphDataComponent.Update]: LayoutGraphDataUpdateMap;
    [LayoutGraphDataComponent.Layout]: LayoutGraphDataLayoutMap;
  }
  export class LayoutGraphData
    implements
      BidirectionalGraph,
      AdjacencyGraph,
      VertexListGraph,
      MutableGraph,
      PropertyGraph,
      NamedGraph,
      ComponentGraph,
      PolymorphicGraph,
      ReferenceGraph,
      MutableReferenceGraph,
      AddressableGraph
  {
    nullVertex(): number;
    readonly directed_category: directional;
    readonly edge_parallel_category: parallel;
    readonly traversal_category: traversal;
    edge(u: number, v: number): boolean;
    source(e: ED): number;
    target(e: ED): number;
    outEdges(v: number): OutEI;
    outDegree(v: number): number;
    inEdges(v: number): InEI;
    inDegree(v: number): number;
    degree(v: number): number;
    adjacentVertices(v: number): AdjI;
    vertices(): IterableIterator<number>;
    numVertices(): number;
    numEdges(): number;
    clear(): void;
    addVertex<T extends LayoutGraphDataValue>(
      id: LayoutGraphDataValue,
      object: LayoutGraphDataValueType[T],
      name: string,
      update: rendering.UpdateFrequency,
      layout: PipelineLayoutData,
      u?: number
    ): number;
    clearVertex(v: number): void;
    removeVertex(u: number): void;
    addEdge(u: number, v: number): ED | null;
    removeEdges(u: number, v: number): void;
    removeEdge(e: ED): void;
    vertexName(v: number): string;
    vertexNameMap(): LayoutGraphDataNameMap;
    get(
      tag: string
    ):
      | LayoutGraphDataNameMap
      | LayoutGraphDataUpdateMap
      | LayoutGraphDataLayoutMap;
    component<T extends LayoutGraphDataComponent>(
      id: T,
      v: number
    ): LayoutGraphDataComponentType[T];
    componentMap<T extends LayoutGraphDataComponent>(
      id: T
    ): LayoutGraphDataComponentPropertyMap[T];
    getName(v: number): string;
    getUpdate(v: number): rendering.UpdateFrequency;
    setUpdate(v: number, value: rendering.UpdateFrequency): void;
    getLayout(v: number): PipelineLayoutData;
    holds(id: LayoutGraphDataValue, v: number): boolean;
    id(v: number): LayoutGraphDataValue;
    object(v: number): LayoutGraphDataObject;
    value<T extends LayoutGraphDataValue>(
      id: T,
      v: number
    ): LayoutGraphDataValueType[T];
    tryValue<T extends LayoutGraphDataValue>(
      id: T,
      v: number
    ): LayoutGraphDataValueType[T] | null;
    visitVertex(visitor: LayoutGraphDataVisitor, v: number): unknown;
    getRenderStage(v: number): RenderStageData;
    getRenderPhase(v: number): RenderPhaseData;
    tryGetRenderStage(v: number): RenderStageData | null;
    tryGetRenderPhase(v: number): RenderPhaseData | null;
    reference(u: number, v: number): boolean;
    parent(e: ED): number;
    child(e: ED): number;
    parents(v: number): InEI;
    children(v: number): OutEI;
    numParents(v: number): number;
    numChildren(v: number): number;
    getParent(v: number): number;
    isAncestor(ancestor: number, descendent: number): boolean;
    addReference(u: number, v: number): ED | null;
    removeReference(e: ED): void;
    removeReferences(u: number, v: number): void;
    locateChild(u: number, name: string): number;
    addressable(absPath: string): boolean;
    locate(absPath: string): number;
    locateRelative(path: string, start?: number): number;
    path(v: number): string;
    readonly components: string[];
    readonly _vertices: LayoutGraphDataVertex[];
    readonly _names: string[];
    readonly _updateFrequencies: rendering.UpdateFrequency[];
    readonly _layouts: PipelineLayoutData[];
    readonly valueNames: string[];
    readonly attributeIndex: Map<string, number>;
    readonly constantIndex: Map<string, number>;
    readonly shaderLayoutIndex: Map<string, number>;
    readonly effects: Map<string, EffectData>;
    constantMacros: string;
  }
  export function getGfxDescriptorType(
    type: rendering.DescriptorTypeOrder
  ): gfx.DescriptorType;
  export function getDescriptorTypeOrder(
    type: gfx.DescriptorType
  ): rendering.DescriptorTypeOrder;
  export function getCustomPassID(
    lg: LayoutGraphData,
    name: string | undefined
  ): number;
  export function getCustomPhaseID(
    lg: LayoutGraphData,
    passID: number,
    name: string | number | undefined
  ): number;
  export function getOrCreateDescriptorID(
    lg: LayoutGraphData,
    name: string
  ): number;
  export function getOrCreateConstantID(
    lg: LayoutGraphData,
    name: string
  ): number;
  export function buildLayoutGraphData(
    lg: LayoutGraph,
    lgData: LayoutGraphData
  ): void;
  export function createGfxDescriptorSetsAndPipelines(
    device: gfx.Device | null,
    g: LayoutGraphData
  ): void;
  export function printLayoutGraphData(g: LayoutGraphData): string;
  export function makeDescriptorSetLayoutData(
    lg: LayoutGraphData,
    rate: rendering.UpdateFrequency,
    set: number,
    descriptors: EffectAsset.IDescriptorInfo
  ): DescriptorSetLayoutData;
  export function initializeDescriptorSetLayoutInfo(
    layoutData: DescriptorSetLayoutData,
    info: gfx.DescriptorSetLayoutInfo
  ): void;
  export function initializeLayoutGraphData(
    device: gfx.Device,
    lg: LayoutGraphData
  ): void;
  export function terminateLayoutGraphData(lg: LayoutGraphData): void;
  export function getEmptyDescriptorSetLayout(): gfx.DescriptorSetLayout;
  export function getEmptyPipelineLayout(): gfx.PipelineLayout;
  export function getOrCreateDescriptorSetLayout(
    lg: LayoutGraphData,
    passID: number,
    phaseID: number,
    rate: rendering.UpdateFrequency
  ): gfx.DescriptorSetLayout;
  export function getDescriptorSetLayout(
    lg: LayoutGraphData,
    passID: number,
    phaseID: number,
    rate: rendering.UpdateFrequency
  ): gfx.DescriptorSetLayout | null;
  export function getOrCreateDescriptorBlockData(
    data: DescriptorSetLayoutData,
    type: gfx.DescriptorType,
    vis: gfx.ShaderStageFlagBit
  ): DescriptorBlockData;
  export function getProgramID(
    lg: LayoutGraphData,
    phaseID: number,
    programName: string
  ): number;
  export function getDescriptorNameID(
    lg: LayoutGraphData,
    name: string
  ): number;
  export function getDescriptorName(
    lg: LayoutGraphData,
    nameID: number
  ): string;
  export function getPerPassDescriptorSetLayoutData(
    lg: LayoutGraphData,
    passID: number
  ): DescriptorSetLayoutData | null;
  export function getPerPhaseDescriptorSetLayoutData(
    lg: LayoutGraphData,
    phaseID: number
  ): DescriptorSetLayoutData | null;
  export function getPerBatchDescriptorSetLayoutData(
    lg: LayoutGraphData,
    phaseID: number,
    programID: any
  ): DescriptorSetLayoutData | null;
  export function getPerInstanceDescriptorSetLayoutData(
    lg: LayoutGraphData,
    phaseID: number,
    programID: any
  ): DescriptorSetLayoutData | null;
  export function getBinding(
    layout: DescriptorSetLayoutData,
    nameID: number
  ): number;
  export const INVALID_ID = 4294967295;
  export class PrintVisitor extends DefaultVisitor {
    discoverVertex(u: number, g: LayoutGraphData): void;
    finishVertex(v: number, g: LayoutGraphData): void;
    space: string;
    oss: string;
  }
  export class VisibilityIndex {
    constructor(
      updateFrequency?: rendering.UpdateFrequency,
      parameterType?: rendering.ParameterType,
      descriptorType?: rendering.DescriptorTypeOrder
    );
    updateFrequency: rendering.UpdateFrequency;
    parameterType: rendering.ParameterType;
    descriptorType: rendering.DescriptorTypeOrder;
  }
  export class VisibilityBlock {
    mergeVisibility(name: string, vis: gfx.ShaderStageFlagBit): void;
    getVisibility(name: string): gfx.ShaderStageFlagBit;
    descriptors: Map<string, gfx.ShaderStageFlagBit>;
  }
  export class VisibilityDB {
    getBlock(index: VisibilityIndex): VisibilityBlock;
    blocks: Map<string, VisibilityBlock>;
  }
  export class VisibilityPass {
    getPhase(phaseName: string): VisibilityDB;
    phases: Map<string, VisibilityDB>;
  }
  export class VisibilityGraph {
    getPass(passName: string): VisibilityPass;
    mergeEffect(asset: EffectAsset): void;
    passes: Map<string, VisibilityPass>;
  }
  export class LayoutGraphInfo {
    constructor(visg: VisibilityGraph);
    lg: LayoutGraph;
    visg: VisibilityGraph;
    readonly enableDebug = false;
    addEffect(asset: EffectAsset): void;
    build(): number;
    print(): string;
  }
  export class BinaryOutputArchive implements rendering.OutputArchive {
    constructor();
    writeBool(value: boolean): void;
    writeNumber(value: number): void;
    writeString(value: string): void;
    reserve(requiredSize: number): void;
    get data(): ArrayBuffer;
    capacity: number;
    size: number;
    buffer: Uint8Array;
    dataView: DataView;
  }
  export class BinaryInputArchive implements rendering.InputArchive {
    constructor(data: ArrayBuffer);
    readBool(): boolean;
    readNumber(): number;
    readString(): string;
    offset: number;
    dataView: DataView;
    textDecoder: TextDecoder;
  }
  export import getUpdateFrequencyName = rendering.getUpdateFrequencyName;
  export import getParameterTypeName = rendering.getParameterTypeName;
  export import getResourceResidencyName = rendering.getResourceResidencyName;
  export import getQueueHintName = rendering.getQueueHintName;
  export import getResourceDimensionName = rendering.getResourceDimensionName;
  export import getTaskTypeName = rendering.getTaskTypeName;
  export import getLightingModeName = rendering.getLightingModeName;
  export import getAttachmentTypeName = rendering.getAttachmentTypeName;
  export import getAccessTypeName = rendering.getAccessTypeName;
  export import getClearValueTypeName = rendering.getClearValueTypeName;
  export import getDescriptorTypeOrderName = rendering.getDescriptorTypeOrderName;
  export import saveRasterView = rendering.saveRasterView;
  export import loadRasterView = rendering.loadRasterView;
  export import saveComputeView = rendering.saveComputeView;
  export import loadComputeView = rendering.loadComputeView;
  export import saveLightInfo = rendering.saveLightInfo;
  export import loadLightInfo = rendering.loadLightInfo;
  export import saveDescriptor = rendering.saveDescriptor;
  export import loadDescriptor = rendering.loadDescriptor;
  export import saveDescriptorBlock = rendering.saveDescriptorBlock;
  export import loadDescriptorBlock = rendering.loadDescriptorBlock;
  export import saveDescriptorBlockFlattened = rendering.saveDescriptorBlockFlattened;
  export import loadDescriptorBlockFlattened = rendering.loadDescriptorBlockFlattened;
  export import saveDescriptorBlockIndex = rendering.saveDescriptorBlockIndex;
  export import loadDescriptorBlockIndex = rendering.loadDescriptorBlockIndex;
  export import saveCopyPair = rendering.saveCopyPair;
  export import loadCopyPair = rendering.loadCopyPair;
  export import saveMovePair = rendering.saveMovePair;
  export import loadMovePair = rendering.loadMovePair;
  export import savePipelineStatistics = rendering.savePipelineStatistics;
  export import loadPipelineStatistics = rendering.loadPipelineStatistics;
  export import UpdateFrequency = rendering.UpdateFrequency;
  export import ParameterType = rendering.ParameterType;
  export import ResourceResidency = rendering.ResourceResidency;
  export import QueueHint = rendering.QueueHint;
  export import ResourceDimension = rendering.ResourceDimension;
  export import ResourceFlags = rendering.ResourceFlags;
  export import TaskType = rendering.TaskType;
  export import SceneFlags = rendering.SceneFlags;
  export import LightingMode = rendering.LightingMode;
  export import AttachmentType = rendering.AttachmentType;
  export import AccessType = rendering.AccessType;
  export import RasterView = rendering.RasterView;
  export import ClearValueType = rendering.ClearValueType;
  export import ComputeView = rendering.ComputeView;
  export import LightInfo = rendering.LightInfo;
  export import DescriptorTypeOrder = rendering.DescriptorTypeOrder;
  export import Descriptor = rendering.Descriptor;
  export import DescriptorBlock = rendering.DescriptorBlock;
  export import DescriptorBlockFlattened = rendering.DescriptorBlockFlattened;
  export import DescriptorBlockIndex = rendering.DescriptorBlockIndex;
  export import CopyPair = rendering.CopyPair;
  export import MovePair = rendering.MovePair;
  export import PipelineStatistics = rendering.PipelineStatistics;
  export import OutputArchive = rendering.OutputArchive;
  export import InputArchive = rendering.InputArchive;
  import { rendering, gfx, EffectAsset } from "cc";
  export {};
}
declare module "cc/editor/embedded-player" {
  export const embeddedPlayerCountTag: unique symbol;
  export const getEmbeddedPlayersTag: unique symbol;
  export const addEmbeddedPlayerTag: unique symbol;
  export const removeEmbeddedPlayerTag: unique symbol;
  export const clearEmbeddedPlayersTag: unique symbol;
  export class EmbeddedPlayer extends ___private._cocos_core_data_editor_extendable__EditorExtendable {
    /**
     * @en
     * Begin time, in seconds.
     * @zh
     * 开始时间，以秒为单位。
     */
    begin: number;
    /**
     * @en
     * End time, in seconds.
     * @zh
     * 结束时间，以秒为单位。
     */
    end: number;
    /**
     * @en
     * Whether the speed of this embedded player should be reconciled with the host animation clip.
     * @zh
     * 子区域的播放速度是否应和宿主动画剪辑保持一致。
     */
    reconciledSpeed: boolean;
    /**
     * @en
     * Player of the embedded player.
     * @zh
     * 子区域的播放器。
     */
    playable: EmbeddedPlayable | null;
  }
  export abstract class EmbeddedPlayable {
    /**
     * @en
     * Instantiates this sub region.
     * @zh
     * 实例化此子区域。
     * @param root The root node of animation context.
     * @internal
     */
    abstract instantiate(
      root: Node
    ): ___private._cocos_animation_embedded_player_embedded_player__EmbeddedPlayableState | null;
  }
  /**
   * @en
   * The embedded particle system playable. The players play particle system on a embedded player.
   * @zh
   * 粒子系统子区域播放器。此播放器在子区域上播放粒子系统。
   */
  export class EmbeddedParticleSystemPlayable extends EmbeddedPlayable {
    /**
     * @en
     * Path to the node where particle system inhabits, relative from animation context root.
     * @zh
     * 粒子系统所在的结点路径，相对于动画上下文的根节点。
     */
    path: string;
    instantiate(
      root: Node
    ): ___private._cocos_animation_embedded_player_embedded_particle_system_player__EmbeddedParticleSystemPlayableState | null;
  }
  /**
   * @en
   * The embedded animation clip playable. The playable play animation clip on a embedded player.
   * @zh
   * 动画剪辑子区域播放器。此播放器在子区域上播放动画剪辑。
   */
  export class EmbeddedAnimationClipPlayable extends EmbeddedPlayable {
    /**
     * @en
     * Path to the node onto which the animation clip would be played, relative from animation context root.
     * @zh
     * 要播放动画剪辑的节点的路径，相对于动画上下文的根节点。
     */
    path: string;
    /**
     * @en
     * The animation clip to play.
     * @zh
     * 要播放的动画剪辑。
     */
    clip: AnimationClip | null;
    instantiate(
      root: Node
    ): ___private._cocos_animation_embedded_player_embedded_animation_clip_player__EmbeddedAnimationClipPlayableState | null;
  }
  import { __private as ___private, Node, AnimationClip } from "cc";
  export {};
}
declare module "cc/editor/exotic-animation" {
  export const exoticAnimationTag: unique symbol;
  /**
   * Animation that:
   * - does not exposed by users;
   * - does not compatible with regular animation;
   * - non-editable;
   * - currently only generated imported from model file.
   */
  export class ExoticAnimation {
    createEvaluator(
      binder: ___private._cocos_animation_tracks_track__Binder
    ): ___private._cocos_animation_exotic_animation_exotic_animation__ExoticTrsAnimationEvaluator;
    addNodeAnimation(
      path: string
    ): ___private._cocos_animation_exotic_animation_exotic_animation__ExoticNodeAnimation;
    collectAnimatedJoints(): string[];
    split(from: number, to: number): ExoticAnimation;
    /**
     * @internal
     */
    toHashString(): string;
  }
  /**
   * @en
   * A real array track animates a real array attribute of target(such as morph weights of mesh renderer).
   * Every element in the array is corresponding to a real channel.
   * @zh
   * 实数数组轨道描述目标上某个实数数组属性（例如网格渲染器的形变权重）的动画。
   * 数组中的每个元素都对应一条实数通道。
   */
  export class RealArrayTrack extends animation.Track {
    /**
     * @en The number of elements in the array which this track produces.
     * If you increased the count, there will be new empty real channels appended.
     * Otherwise if you decreased the count, the last specified number channels would be removed.
     * @zh 此轨道产生的数组元素的数量。
     * 当你增加数量时，会增加新的空实数通道；当你减少数量时，最后几个指定数量的通道会被移除。
     */
    get elementCount(): number;
    set elementCount(value: number);
    /**
     * @en The channels of the track.
     * @zh 返回此轨道的所有通道的数组。
     */
    channels(): ___private._cocos_animation_tracks_track__RealChannel[];
    /**
     * @internal
     */
    [___private._cocos_animation_define__createEvalSymbol](): ___private._cocos_animation_tracks_array_track__RealArrayTrackEval;
  }
  import { AnimationMask } from "cc/editor/new-gen-anim";
  import { __private as ___private, animation } from "cc";
  export {};
}
declare module "cc/editor/lod-group-utils" {
  export class LODGroupEditorUtility {
    /**
     * @en Get the lod level used under the current camera, -1 indicates no lod is used.
     * @zh 获取当前摄像机下，使用哪一级的LOD，-1 表示没有lod被使用
     * @param lodGroup current LOD Group component.
     * @param camera current perspective camera.
     * @returns visible LOD index in lodGroup.
     */
    static getVisibleLOD(
      lodGroup: LODGroup,
      camera: renderer.scene.Camera
    ): number;
    /**
     * @en Get the percentage of objects used on the screen under the current camera.
     * @zh 获取当前摄像机下，物体在屏幕上的占用比率
     * @param lodGroup current LOD Group component
     * @param camera current perspective camera
     * @returns height of current lod group relative to camera position in screen space, aka. relativeHeight
     */
    static getRelativeHeight(
      lodGroup: LODGroup,
      camera: renderer.scene.Camera
    ): number | null;
    /**
     * @zh 强制使用某几级的LOD
     * @en Force multi LOD level to use.
     * lodIndexArray @en The LOD level array. Passing [] will return to standard LOD processing. @zh 要使用的LOD层级数组，传[]时将使用标准的处理流程。
     */
    static forceLODs(lodGroup: LODGroup, lodIndexArray: number[]): void;
  }
  import { LODGroup, renderer } from "cc";
  export {};
}
declare module "cc/editor/macro" {
  export { macro, Macro } from "cc";
  export {};
}
declare module "cc/editor/new-gen-anim" {
  export function blend1D(
    weights: number[],
    thresholds: readonly number[],
    value: number
  ): void;
  /**
   * Blends given samples using simple directional algorithm.
   * @param weights Result weights of each sample.
   * @param samples Every samples' parameter.
   * @param input Input parameter.
   */
  export const blendSimpleDirectional: (
    weights: number[],
    samples: readonly math.Vec2[],
    input: Readonly<math.Vec2>
  ) => void;
  /**
   * Validates the samples if they satisfied the requirements of simple directional algorithm.
   * @param samples Samples to validate.
   * @returns Issues the samples containing.
   */
  export function validateSimpleDirectionalSamples(
    samples: ReadonlyArray<math.Vec2>
  ): SimpleDirectionalSampleIssue[];
  /**
   * Simple directional issue representing some samples have same(or very similar) direction.
   */
  export class SimpleDirectionalIssueSameDirection {
    samples: readonly number[];
    constructor(samples: readonly number[]);
  }
  export type SimpleDirectionalSampleIssue =
    SimpleDirectionalIssueSameDirection;
  export function viewVariableBindings(
    animationGraph: AnimationGraph
  ): Generator<VariableBindingView>;
  export interface VariableBindingView {
    /**
     * The current bounded variable name.
     */
    readonly name: string;
    /**
     * The acceptable types of this binding.
     */
    readonly acceptableTypes: animation.VariableType[];
    /**
     * Rebinds this binding to new variable.
     * @param _newVariableName
     */
    rebind(_newVariableName: string): void;
    /**
     * Unbinds the variable.
     */
    unbind(): void;
  }
  export class MotionPreviewer extends ___private._editor_src_marionette_preview__AnimationGraphPartialPreviewer {
    get timelineStats(): Readonly<MotionPreviewerTimelineStats>;
    /**
     * Gets an iterable to the weights of each motion(that has runtime ID).
     */
    queryWeights(): Iterable<
      [__private._cocos_animation_marionette_graph_debug__RuntimeID, number]
    >;
    setMotion(
      motion: __private._cocos_animation_marionette_motion__Motion
    ): void;
    setTime(time: number): void;
    updateVariable(id: string, value: animation.Value): void;
    evaluate(): void;
  }
  export class TransitionPreviewer extends ___private._editor_src_marionette_preview__AnimationGraphPartialPreviewer {
    constructor(root: Node);
    destroy(): void;
    get timelineStats(): Readonly<TransitionPreviewerTimelineStats>;
    setSourceMotion(
      motion: __private._cocos_animation_marionette_motion__Motion
    ): void;
    setTargetMotion(
      motion: __private._cocos_animation_marionette_motion__Motion
    ): void;
    setTransitionDuration(value: number): void;
    setRelativeTransitionDuration(value: boolean): void;
    calculateTransitionDurationFromTimelineLength(value: number): number;
    setExitTimes(value: number): void;
    setExitTimeEnabled(value: boolean): void;
    setDestinationStart(value: number): void;
    setRelativeDestinationStart(value: boolean): void;
    calculateExitTimesFromTimelineLength(value: number): number;
    updateVariable(id: string, value: animation.Value): void;
    /**
     *
     * @param time Player time, in seconds.
     */
    setTime(time: number): void;
    evaluate(): void;
  }
  export interface MotionPreviewerTimelineStats {
    timeLineLength: number;
  }
  export interface TransitionPreviewerTimelineStats {
    timeLineLength: number;
    sourceMotionStart: number;
    sourceMotionRepeatCount: number;
    sourceMotionDuration: number;
    targetMotionStart: number;
    targetMotionRepeatCount: number;
    targetMotionDuration: number;
    exitTimesStart: number;
    exitTimesLength: number;
    transitionDurationStart: number;
    transitionDurationLength: number;
  }
  /**
   * Clones a state into same state machine.
   * @param stateMachine The state machine within which the motion state locates.
   * @param state The state.
   * @param includeTransitions If true, transitions are also cloned.
   * @returns The newly created state.
   *
   * For each editor extras object attached on animation-graph-specific objects,
   * if the editor extras object has a method called `clone`,
   * that method would be called to perform a clone operation on that editor extras object.
   * The return value would be used as the clone result.
   * The method `clone` has the signature: `(host: EditorExtendableObject) => unknown`.
   * Otherwise, if no `clone` method provide, the new editor extras would be set to undefined.
   */
  export function cloneState<
    TState extends MotionState | EmptyState | SubStateMachine
  >(
    stateMachine: StateMachine,
    state: TState,
    includeTransitions: boolean
  ): TState;
  /**
   * Clones a state into maybe another state machine.
   * @param stateMachine The state machine within which the motion state locates.
   * @param state The state.
   * @param targetStateMachine Target state machine
   * @returns The newly created state.
   *
   * For each editor extras object attached on animation-graph-specific objects,
   * if the editor extras object has a method called `clone`,
   * that method would be called to perform a clone operation on that editor extras object.
   * The return value would be used as the clone result.
   * The method `clone` has the signature: `(host: EditorExtendableObject) => unknown`.
   * Otherwise, if no `clone` method provide, the new editor extras would be set to undefined.
   */
  export function cloneState(
    stateMachine: StateMachine,
    state: MotionState | EmptyState | SubStateMachine,
    targetStateMachine: StateMachine
  ): SubStateMachine;
  /**
   * Turns a motion state into a new sub state machine.
   * @param stateMachine The state machine within which the motion state locates.
   * @param state The motion state.
   * @returns The newly created sub state machine.
   */
  export function turnMotionStateIntoSubStateMachine(
    stateMachine: StateMachine,
    state: MotionState
  ): SubStateMachine;
  export function visitAnimationClips(
    animationGraph: AnimationGraph
  ): Generator<AnimationClip>;
  export function visitAnimationClipsInController(
    animationController: animation.AnimationController
  ): Generator<AnimationClip>;
  export function visitAnimationGraphEditorExtras(
    animationGraph: AnimationGraph
  ): Generator<___private._cocos_core_data_editor_extras_tag__EditorExtendableObject>;
  export class InvalidTransitionError extends Error {
    constructor(type: "to-entry" | "to-any" | "from-exit");
  }
  export class VariableNotDefinedError extends Error {
    constructor(name: string);
  }
  export class AnimationGraph
    extends __private._cocos_animation_marionette_animation_graph_like__AnimationGraphLike
    implements animation.AnimationGraphRunTime
  {
    readonly __brand: "AnimationGraph";
    constructor();
    onLoaded(): void;
    get layers(): readonly Layer[];
    get variables(): Iterable<[string, VariableDescription]>;
    /**
     * Adds a layer.
     * @returns The new layer.
     */
    addLayer(): Layer;
    /**
     * Removes a layer.
     * @param index Index to the layer to remove.
     */
    removeLayer(index: number): void;
    /**
     * Adjusts the layer's order.
     * @param index
     * @param newIndex
     */
    moveLayer(index: number, newIndex: number): void;
    /**
     * Adds a boolean variable.
     * @param name The variable's name.
     * @param value The variable's default value.
     */
    addBoolean(name: string, value?: boolean): void;
    /**
     * Adds a floating variable.
     * @param name The variable's name.
     * @param value The variable's default value.
     */
    addFloat(name: string, value?: number): void;
    /**
     * Adds an integer variable.
     * @param name The variable's name.
     * @param value The variable's default value.
     */
    addInteger(name: string, value?: number): void;
    /**
     * Adds a trigger variable.
     * @param name The variable's name.
     * @param value The variable's default value.
     * @param resetMode The trigger's reset mode.
     */
    addTrigger(
      name: string,
      value?: boolean,
      resetMode?: TriggerResetMode
    ): void;
    removeVariable(name: string): void;
    getVariable(name: string): VariableDescription | undefined;
    /**
     * @zh 重命名一个变量。注意，所有对该变量的引用都不会修改。
     * 如果变量的原始名称不存在或者新的名称已存在，此方法不会做任何事。
     * 变量在图中的顺序会保持不变。
     * @en Renames an variable. Note, this won't changes any reference to the variable.
     * If the original name of the variable doesn't exists or
     * the new name has already existed, this method won't do anything.
     * The variable's order in the graph is also retained.
     * @param name @zh 要重命名的变量的名字。 @en The name of the variable to be renamed.
     * @param newName @zh 新的名字。 @en New name.
     */
    renameVariable(name: string, newName: string): void;
  }
  export function isAnimationTransition(
    transition: Transition
  ): transition is AnimationTransition;
  export class StateMachine extends ___private._cocos_core_data_editor_extendable__EditorExtendable {
    /**
     * // TODO: HACK
     * @internal
     */
    __callOnAfterDeserializeRecursive(): void;
    constructor();
    [___private._cocos_serialization_deserialize_symbols__onAfterDeserializedTag](): void;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): __private._cocos_animation_marionette_motion__MotionEval | null;
    /**
     * The entry state.
     */
    get entryState(): State;
    /**
     * The exit state.
     */
    get exitState(): State;
    /**
     * The any state.
     */
    get anyState(): State;
    /**
     * Gets an iterator to all states within this graph.
     * @returns The iterator.
     */
    states(): Iterable<State>;
    /**
     * Gets an iterator to all transitions within this graph.
     * @returns The iterator.
     */
    transitions(): Iterable<__private._cocos_animation_marionette_animation_graph__Transition>;
    /**
     * Gets the transitions between specified states.
     * @param from Transition source.
     * @param to Transition target.
     * @returns Iterator to the transitions
     */
    getTransitionsBetween(
      from: State,
      to: State
    ): Iterable<__private._cocos_animation_marionette_animation_graph__Transition>;
    /**
     * @en
     * Gets all transitions outgoing from specified state.
     * @zh
     * 获取从指定状态引出的所有过渡。
     * @param from @en The state. @zh 指定状态。
     * @returns @en Iterable to result transitions, in priority order. @zh 到结果过渡的迭代器，按优先级顺序。
     */
    getOutgoings(
      from: State
    ): Iterable<__private._cocos_animation_marionette_animation_graph__Transition>;
    /**
     * Gets all incoming transitions of specified state.
     * @param to The state.
     * @returns Result transitions.
     */
    getIncomings(
      to: State
    ): Iterable<__private._cocos_animation_marionette_animation_graph__Transition>;
    /**
     * Adds a motion state into this state machine.
     * @returns The newly created motion.
     */
    addMotion(): MotionState;
    /**
     * Adds a sub state machine into this state machine.
     * @returns The newly created state machine.
     */
    addSubStateMachine(): SubStateMachine;
    /**
     * Adds an empty state into this state machine.
     * @returns The newly created empty state.
     */
    addEmpty(): EmptyState;
    /**
     * Removes specified state from this state machine.
     * @param state The state to remove.
     */
    remove(state: State): void;
    /**
     * Connect two states.
     * @param from Source state.
     * @param to Target state.
     * @param condition The transition condition.
     */
    connect(
      from: MotionState,
      to: State,
      conditions?: Condition[]
    ): AnimationTransition;
    /**
     * Connect two states.
     * @param from Source state.
     * @param to Target state.
     * @param condition The transition condition.
     */
    connect(
      from: EmptyState,
      to: State,
      conditions?: Condition[]
    ): EmptyStateTransition;
    /**
     * Connect two states.
     * @param from Source state.
     * @param to Target state.
     * @param condition The transition condition.
     * @throws `InvalidTransitionError` if:
     * - the target state is entry or any, or
     * - the source state is exit.
     */
    connect(from: State, to: State, conditions?: Condition[]): Transition;
    disconnect(from: State, to: State): void;
    removeTransition(
      removal: __private._cocos_animation_marionette_animation_graph__Transition
    ): void;
    eraseOutgoings(from: State): void;
    eraseIncomings(to: State): void;
    eraseTransitionsIncludes(state: State): void;
    /**
     * @en
     * Adjusts the priority of a transition.
     *
     * To demonstrate, one can imagine a transition array sorted by their priority.
     * - If `diff` is zero, nothing's gonna happen.
     * - Negative `diff` raises the priority:
     *   `diff` number of transitions originally having higher priority than `adjusting`
     *   will then have lower priority than `adjusting`.
     * - Positive `diff` reduce the priority:
     *   `|diff|` number of transitions originally having lower priority than `adjusting`
     *   will then have higher priority than `adjusting`.
     *
     * If the number of transitions indicated by `diff`
     * is more than the actual one, the actual number would be taken.
     * @zh
     * 调整过渡的优先级。
     *
     * 为了说明，可以想象一个由优先级排序的过渡数组。
     * - 如果 `diff` 是 0，无事发生。
     * - 负的 `diff` 会提升该过渡的优先级：原本优先于 `adjusting` 的 `diff` 条过渡的优先级会设置为低于 `adjusting`。
     * - 正的 `diff` 会降低该过渡的优先级：原本优先级低于 `adjusting` 的 `|diff|` 条过渡会设置为优先于 `adjusting`。
     *
     * 如果 `diff` 指示的过渡数量比实际多，则会使用实际数量。
     *
     * @param adjusting @en The transition to adjust the priority. @zh 需要调整优先级的过渡。
     * @param diff @en Indicates how to adjust the priority. @zh 指示如何调整优先级。
     */
    adjustTransitionPriority(
      adjusting: __private._cocos_animation_marionette_animation_graph__Transition,
      diff: number
    ): void;
    copyTo(that: StateMachine): void;
    clone(): StateMachine;
  }
  export class SubStateMachine extends __private._cocos_animation_marionette_state__InteractiveState {
    get stateMachine(): StateMachine;
    copyTo(that: SubStateMachine): void;
    _clone(): SubStateMachine;
  }
  export class EmptyStateTransition extends __private._cocos_animation_marionette_animation_graph__Transition {
    /**
     * The transition duration, in seconds.
     */
    duration: number;
    /**
     * @en The start time of (final) destination motion state when this transition starts.
     * Its unit is seconds if `relativeDestinationStart` is `false`,
     * Otherwise, its unit is the duration of destination motion state.
     * @zh 此过渡开始时，（最终）目标动作状态的起始时间。
     * 如果 `relativeDestinationStart`为 `false`，其单位是秒，否则其单位是目标动作状态的周期。
     */
    destinationStart: number;
    /**
     * @en Determines the unit of destination start time. See `destinationStart`.
     * @zh 决定了目标起始时间的单位。见 `destinationStart`。
     */
    relativeDestinationStart: boolean;
    copyTo(that: EmptyStateTransition): void;
  }
  export class EmptyState extends State {
    __brand: "EmptyState";
    _clone(): EmptyState;
  }
  export type Transition = Omit<
    __private._cocos_animation_marionette_animation_graph__Transition,
    "from" | "to"
  > & {
    readonly from: __private._cocos_animation_marionette_animation_graph__Transition["from"];
    readonly to: __private._cocos_animation_marionette_animation_graph__Transition["to"];
  };
  export type AnimationTransition = Omit<
    __private._cocos_animation_marionette_animation_graph__AnimationTransition,
    "from" | "to"
  > & {
    readonly from: __private._cocos_animation_marionette_animation_graph__AnimationTransition["from"];
    readonly to: __private._cocos_animation_marionette_animation_graph__AnimationTransition["to"];
  };
  export class Layer
    implements
      __private._cocos_animation_marionette_ownership__OwnedBy<AnimationGraph>
  {
    [__private._cocos_animation_marionette_ownership__ownerSymbol]:
      | AnimationGraph
      | undefined;
    name: string;
    weight: number;
    mask: AnimationMask | null;
    /**
     * @marked_as_engine_private
     */
    constructor();
    get stateMachine(): StateMachine;
  }
  export class State
    extends ___private._cocos_core_data_editor_extendable__EditorExtendable
    implements
      __private._cocos_animation_marionette_ownership__OwnedBy<
        Layer | StateMachine
      >
  {
    [__private._cocos_animation_marionette_ownership__ownerSymbol]:
      | StateMachine
      | undefined;
    name: string;
    [__private._cocos_animation_marionette_state__outgoingsSymbol]: __private._cocos_animation_marionette_animation_graph__TransitionInternal[];
    [__private._cocos_animation_marionette_state__incomingsSymbol]: __private._cocos_animation_marionette_animation_graph__TransitionInternal[];
    constructor();
    copyTo(that: State): void;
  }
  export type VariableDescription =
    | __private._cocos_animation_marionette_animation_graph__BasicVariableDescription<animation.VariableType.FLOAT>
    | __private._cocos_animation_marionette_animation_graph__BasicVariableDescription<animation.VariableType.INTEGER>
    | __private._cocos_animation_marionette_animation_graph__BasicVariableDescription<animation.VariableType.BOOLEAN>
    | __private._cocos_animation_marionette_animation_graph__TriggerVariable;
  export class BinaryCondition implements Condition {
    static readonly Operator: typeof __private._cocos_animation_marionette_condition__BinaryOperator;
    operator: __private._cocos_animation_marionette_condition__BinaryOperator;
    lhs: BindableNumber;
    rhs: BindableNumber;
    clone(): BinaryCondition;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_parametric__BindContext
    ): __private._cocos_animation_marionette_condition__BinaryConditionEval;
  }
  export namespace BinaryCondition {
    export type Operator =
      __private._cocos_animation_marionette_condition__BinaryOperator;
  }
  export class UnaryCondition implements Condition {
    static readonly Operator: typeof __private._cocos_animation_marionette_condition__UnaryOperator;
    operator: __private._cocos_animation_marionette_condition__UnaryOperator;
    operand: BindableBoolean;
    clone(): UnaryCondition;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_condition__ConditionEvalContext
    ): __private._cocos_animation_marionette_condition__UnaryConditionEval;
  }
  export namespace UnaryCondition {
    export type Operator =
      __private._cocos_animation_marionette_condition__UnaryOperator;
  }
  export class TriggerCondition implements Condition {
    trigger: string;
    clone(): TriggerCondition;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_parametric__BindContext
    ): __private._cocos_animation_marionette_condition__ConditionEval;
  }
  export interface Condition {
    clone(): Condition;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_parametric__BindContext
    ): __private._cocos_animation_marionette_condition__ConditionEval;
  }
  /**
   * @en The reset mode of boolean variables. It indicates when to reset the variable as `false`.
   * @zh 布尔类型变量的重置模式，指示在哪些情况下将变量重置为 `false`。
   */
  export enum TriggerResetMode {
    /**
     * @en The variable is reset when it's consumed by animation transition.
     * @zh 在该变量被动画过渡消耗后自动重置。
     */
    AFTER_CONSUMED = 0,
    /**
     * @en The variable is reset in next frame or when it's consumed by animation transition.
     * @zh 下一帧自动重置；在该变量被动画过渡消耗后也会自动重置。
     */
    NEXT_FRAME_OR_AFTER_CONSUMED = 1,
  }
  export class MotionState extends __private._cocos_animation_marionette_state__InteractiveState {
    motion: __private._cocos_animation_marionette_motion__Motion | null;
    speed: number;
    /**
     * Should be float.
     */
    speedMultiplier: string;
    speedMultiplierEnabled: boolean;
    copyTo(that: MotionState): this;
    _clone(): MotionState;
  }
  export class ClipMotion
    extends ___private._cocos_core_data_editor_extendable__EditorExtendable
    implements __private._cocos_animation_marionette_motion__Motion
  {
    clip: AnimationClip | null;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): __private._cocos_animation_marionette_clip_motion__ClipMotionEval | null;
    clone(): ClipMotion;
  }
  export interface AnimationBlend
    extends __private._cocos_animation_marionette_motion__Motion,
      ___private._cocos_core_data_editor_extendable__EditorExtendable {
    [__private._cocos_animation_marionette_create_eval__createEval](
      _context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): __private._cocos_animation_marionette_motion__MotionEval | null;
  }
  export class AnimationBlend
    extends ___private._cocos_core_data_editor_extendable__EditorExtendable
    implements __private._cocos_animation_marionette_motion__Motion
  {
    name: string;
    copyTo(that: AnimationBlend): void;
  }
  export class AnimationBlendDirect extends AnimationBlend {
    static Item: typeof __private._cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
    get items(): __private._cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem[];
    set items(
      value: __private._cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem[]
    );
    clone(): AnimationBlendDirect;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): any;
  }
  export namespace AnimationBlendDirect {
    export type Item =
      __private._cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
  }
  export class AnimationBlend1D extends AnimationBlend {
    static Item: typeof __private._cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
    param: BindableNumber;
    get items(): Iterable<__private._cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem>;
    set items(
      value: Iterable<__private._cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem>
    );
    clone(): AnimationBlend1D;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): any;
  }
  export namespace AnimationBlend1D {
    export type Item =
      __private._cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
  }
  export class AnimationBlend2D extends AnimationBlend {
    static Algorithm: typeof __private._cocos_animation_marionette_animation_blend_2d__Algorithm;
    static Item: typeof __private._cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
    algorithm: __private._cocos_animation_marionette_animation_blend_2d__Algorithm;
    paramX: BindableNumber;
    paramY: BindableNumber;
    get items(): Iterable<__private._cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem>;
    set items(
      items: Iterable<__private._cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem>
    );
    clone(): AnimationBlend2D;
    [__private._cocos_animation_marionette_create_eval__createEval](
      context: __private._cocos_animation_marionette_motion__MotionEvalContext
    ): any;
  }
  export namespace AnimationBlend2D {
    export type Algorithm =
      typeof __private._cocos_animation_marionette_animation_blend_2d__Algorithm;
    export type Item =
      __private._cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
  }
  export class BindableNumber
    implements
      __private._cocos_animation_marionette_parametric__Bindable<number>
  {
    variable: string;
    value: number;
    constructor(value?: number);
    clone(): __private._cocos_animation_marionette_parametric__Bindable<number>;
  }
  export class BindableBoolean
    implements
      __private._cocos_animation_marionette_parametric__Bindable<boolean>
  {
    variable: string;
    value: boolean;
    constructor(value?: boolean);
    clone(): __private._cocos_animation_marionette_parametric__Bindable<boolean>;
  }
  export class AnimationMask extends Asset {
    get joints(): Iterable<__private._cocos_animation_marionette_animation_mask__JointMaskInfo>;
    set joints(
      value: Iterable<__private._cocos_animation_marionette_animation_mask__JointMaskInfo>
    );
    /**
     * @zh 添加一个关节遮罩项。
     * 已存在的相同路径的关节遮罩项会被替换为新的。
     * @en Add a joint mask item.
     * Already existing joint mask with same path item will be replaced.
     * @param path @zh 关节的路径。 @en The joint's path.
     * @param enabled @zh 是否启用该关节。 @en Whether to enable the joint.
     */
    addJoint(path: string, enabled: boolean): void;
    removeJoint(removal: string): void;
    clear(): void;
    filterDisabledNodes(root: Node): Set<Node>;
  }
  export namespace AnimationMask {
    export type JointMaskInfo =
      __private._cocos_animation_marionette_animation_mask__JointMaskInfo_;
  }
  export class AnimationGraphVariant
    extends __private._cocos_animation_marionette_animation_graph_like__AnimationGraphLike
    implements animation.AnimationGraphVariantRunTime
  {
    __brand: "AnimationGraphVariant";
    get original(): AnimationGraph | null;
    set original(value: AnimationGraph | null);
    get clipOverrides(): __private._cocos_animation_marionette_animation_graph_variant__ClipOverrideMap;
  }
  export import Value = animation.Value;
  export import VariableType = animation.VariableType;
  export namespace __private {
    export type _cocos_animation_marionette_graph_debug__RuntimeID = number;
    export const _cocos_animation_marionette_create_eval__createEval: unique symbol;
    export class _cocos_animation_marionette_variable__VarInstance {
      type: animation.VariableType;
      resetMode: TriggerResetMode;
      constructor(type: animation.VariableType, value: animation.Value);
      get value(): animation.Value;
      set value(value: animation.Value);
      bind<T, TThis, ExtraArgs extends any[]>(
        fn: (this: TThis, value: T, ...args: ExtraArgs) => void,
        thisArg: TThis,
        ...args: ExtraArgs
      ): animation.Value;
    }
    export interface _cocos_animation_marionette_parametric__BindContext {
      getVar(
        id: string
      ): _cocos_animation_marionette_variable__VarInstance | undefined;
    }
    export interface _cocos_animation_marionette_motion__CreateClipEvalContext {
      node: Node;
      blendBuffer: ___private._cocos_3d_skeletal_animation_skeletal_animation_blending__BlendStateBuffer;
      mask?: AnimationMask;
    }
    /**
     * @zh
     * 描述了如何对动画图中引用的动画剪辑进行替换。
     * @en
     * Describes how to override animation clips in an animation graph.
     */
    export type _cocos_animation_marionette_graph_eval__ReadonlyClipOverrideMap =
      {
        /**
         * @zh
         * 获取指定原始动画剪辑应替换成的动画剪辑。
         * @en
         * Gets the overriding animation clip of specified original animation clip.
         *
         * @param animationClip @zh 原始动画剪辑。@en Original animation clip.
         *
         * @returns @zh 替换的动画剪辑；如果原始动画剪辑不应被替换，则应该返回 `undefined`。 @en
         * The overriding animation clip.
         * If the original animation clip should not be overrode, `undefined` should be returned.
         */
        get(animationClip: AnimationClip): AnimationClip | undefined;
      };
    export interface _cocos_animation_marionette_motion__MotionEvalContext
      extends _cocos_animation_marionette_parametric__BindContext,
        _cocos_animation_marionette_motion__CreateClipEvalContext {
      clipOverrides: _cocos_animation_marionette_graph_eval__ReadonlyClipOverrideMap | null;
    }
    export type _cocos_animation_marionette_motion__OverrideClipContext =
      _cocos_animation_marionette_motion__CreateClipEvalContext;
    export interface _cocos_animation_marionette_motion__MotionEval {
      /**
       * The runtime ID. Maybe invalid.
       */
      readonly runtimeId?: _cocos_animation_marionette_graph_debug__RuntimeID;
      readonly duration: number;
      sample(progress: number, baseWeight: number): void;
      getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus>;
      overrideClips(
        overrides: _cocos_animation_marionette_graph_eval__ReadonlyClipOverrideMap,
        context: _cocos_animation_marionette_motion__OverrideClipContext
      ): void;
    }
    export interface _cocos_animation_marionette_motion__Motion {
      [_cocos_animation_marionette_create_eval__createEval](
        context: _cocos_animation_marionette_motion__MotionEvalContext
      ): _cocos_animation_marionette_motion__MotionEval | null;
      clone(): _cocos_animation_marionette_motion__Motion;
    }
    /**
     * @zh `AnimationGraph` 和 `AnimationGraphVariant` 的内部共同基类，
     * 仅用于特殊目的，不应另作它用，也不应导出为公开接口。
     * @en The common base class of `AnimationGraph` and `AnimationGraphVariant`
     * which exists for special purpose and should not be used otherwise and should not be exported.
     *
     * @internal This class serves as the editor switch of
     * animation graph asset and animation graph variant asset,
     * especially as the `graph` property on animation controller component.
     */
    export abstract class _cocos_animation_marionette_animation_graph_like__AnimationGraphLike extends Asset {}
    export const _cocos_animation_marionette_ownership__ownerSymbol: unique symbol;
    export interface _cocos_animation_marionette_ownership__OwnedBy<T> {
      [_cocos_animation_marionette_ownership__ownerSymbol]: T | undefined;
    }
    export class _cocos_animation_marionette_animation_graph__Transition
      extends ___private._cocos_core_data_editor_extendable__EditorExtendable
      implements
        _cocos_animation_marionette_ownership__OwnedBy<StateMachine>,
        _cocos_animation_marionette_animation_graph__Transition
    {
      [_cocos_animation_marionette_ownership__ownerSymbol]:
        | StateMachine
        | undefined;
      /**
       * The transition source.
       */
      from: State;
      /**
       * The transition target.
       */
      to: State;
      /**
       * The transition condition.
       */
      conditions: Condition[];
      constructor(from: State, to: State, conditions?: Condition[]);
      copyTo(
        that: _cocos_animation_marionette_animation_graph__Transition
      ): void;
      [_cocos_animation_marionette_ownership__ownerSymbol]:
        | StateMachine
        | undefined;
    }
    export type _cocos_animation_marionette_state__StateMachineComponentConstructor<
      T extends animation.StateMachineComponent
    > = ___private._types_globals__Constructor<T>;
    export class _cocos_animation_marionette_state__InteractiveState extends State {
      get components(): Iterable<animation.StateMachineComponent>;
      addComponent<T extends animation.StateMachineComponent>(
        constructor: _cocos_animation_marionette_state__StateMachineComponentConstructor<T>
      ): T;
      removeComponent(component: animation.StateMachineComponent): void;
      instantiateComponents(): animation.StateMachineComponent[];
      copyTo(that: _cocos_animation_marionette_state__InteractiveState): void;
    }
    export enum _cocos_animation_marionette_animation_graph__TransitionInterruptionSource {
      NONE = 0,
      CURRENT_STATE = 1,
      NEXT_STATE = 2,
      CURRENT_STATE_THEN_NEXT_STATE = 3,
      NEXT_STATE_THEN_CURRENT_STATE = 4,
    }
    export class _cocos_animation_marionette_animation_graph__AnimationTransition extends _cocos_animation_marionette_animation_graph__Transition {
      /**
       * The transition duration.
       * The unit of the duration is the real duration of transition source
       * if `relativeDuration` is `true` or seconds otherwise.
       */
      duration: number;
      /**
       * Determines the unit of transition duration. See `duration`.
       */
      relativeDuration: boolean;
      exitConditionEnabled: boolean;
      /**
       * @en The start time of (final) destination motion state when this transition starts.
       * Its unit is seconds if `relativeDestinationStart` is `false`,
       * Otherwise, its unit is the duration of destination motion state.
       * @zh 此过渡开始时，（最终）目标动作状态的起始时间。
       * 如果 `relativeDestinationStart`为 `false`，其单位是秒，否则其单位是目标动作状态的周期。
       */
      destinationStart: number;
      /**
       * @en Determines the unit of destination start time. See `destinationStart`.
       * @zh 决定了目标起始时间的单位。见 `destinationStart`。
       */
      relativeDestinationStart: boolean;
      get exitCondition(): number;
      set exitCondition(value: number);
      /**
       * @internal This field is exposed for **experimental editor only** usage.
       */
      get interruptible(): boolean;
      set interruptible(value: boolean);
      copyTo(
        that: _cocos_animation_marionette_animation_graph__AnimationTransition
      ): void;
      /**
       * @internal This field is exposed for **internal** usage.
       */
      interruptionSource: _cocos_animation_marionette_animation_graph__TransitionInterruptionSource;
    }
    export const _cocos_animation_marionette_state__outgoingsSymbol: unique symbol;
    export type _cocos_animation_marionette_animation_graph__TransitionInternal =
      _cocos_animation_marionette_animation_graph__Transition;
    export const _cocos_animation_marionette_state__incomingsSymbol: unique symbol;
    export interface _cocos_animation_marionette_animation_graph__BasicVariableDescription<
      TType
    > {
      readonly type: TType;
      value: TType extends animation.VariableType.FLOAT
        ? number
        : TType extends animation.VariableType.INTEGER
        ? number
        : TType extends animation.VariableType.BOOLEAN
        ? boolean
        : TType extends animation.VariableType.TRIGGER
        ? boolean
        : never;
    }
    export class _cocos_animation_marionette_animation_graph__TriggerVariable
      implements
        _cocos_animation_marionette_animation_graph__BasicVariableDescription<animation.VariableType.TRIGGER>
    {
      get type(): animation.VariableType.TRIGGER;
      get value(): boolean;
      set value(value: boolean);
      get resetMode(): TriggerResetMode;
      set resetMode(value: TriggerResetMode);
    }
    export enum _cocos_animation_marionette_condition__BinaryOperator {
      EQUAL_TO = 0,
      NOT_EQUAL_TO = 1,
      LESS_THAN = 2,
      LESS_THAN_OR_EQUAL_TO = 3,
      GREATER_THAN = 4,
      GREATER_THAN_OR_EQUAL_TO = 5,
    }
    export interface _cocos_animation_marionette_condition__ConditionEval {
      /**
       * Evaluates this condition.
       */
      eval(): boolean;
    }
    export class _cocos_animation_marionette_condition__BinaryConditionEval
      implements _cocos_animation_marionette_condition__ConditionEval
    {
      constructor(
        operator: _cocos_animation_marionette_condition__BinaryOperator,
        lhs: number,
        rhs: number
      );
      reset(lhs: number, rhs: number): void;
      setLhs(value: number): void;
      setRhs(value: number): void;
      /**
       * Evaluates this condition.
       */
      eval(): boolean;
    }
    export enum _cocos_animation_marionette_condition__UnaryOperator {
      TRUTHY = 0,
      FALSY = 1,
    }
    export type _cocos_animation_marionette_condition__ConditionEvalContext =
      _cocos_animation_marionette_parametric__BindContext;
    export class _cocos_animation_marionette_condition__UnaryConditionEval
      implements _cocos_animation_marionette_condition__ConditionEval
    {
      constructor(
        operator: _cocos_animation_marionette_condition__UnaryOperator,
        operand: boolean
      );
      reset(value: boolean): void;
      setOperand(value: boolean): void;
      /**
       * Evaluates this condition.
       */
      eval(): boolean;
    }
    export class _cocos_animation_marionette_clip_motion__ClipMotionEval
      implements _cocos_animation_marionette_motion__MotionEval
    {
      /**
       * @internal
       */
      __DEBUG__ID__?: string;
      runtimeId?: number;
      constructor(
        context: _cocos_animation_marionette_motion__MotionEvalContext,
        clip: AnimationClip
      );
      getClipStatuses(
        baseWeight: number
      ): Iterator<animation.ClipStatus, any, undefined>;
      get duration(): number;
      get progress(): number;
      sample(progress: number, weight: number): void;
      overrideClips(
        overrides: _cocos_animation_marionette_graph_eval__ReadonlyClipOverrideMap,
        context: _cocos_animation_marionette_motion__OverrideClipContext
      ): void;
    }
    export class _cocos_animation_marionette_animation_blend__AnimationBlendItem {
      motion: _cocos_animation_marionette_motion__Motion | null;
      clone(): _cocos_animation_marionette_animation_blend__AnimationBlendItem;
      protected _copyTo(
        that: _cocos_animation_marionette_animation_blend__AnimationBlendItem
      ): _cocos_animation_marionette_animation_blend__AnimationBlendItem;
    }
    export class _cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem extends _cocos_animation_marionette_animation_blend__AnimationBlendItem {
      weight: number;
      clone(): _cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
      protected _copyTo(
        that: _cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem
      ): _cocos_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
    }
    export class _cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem extends _cocos_animation_marionette_animation_blend__AnimationBlendItem {
      threshold: number;
      clone(): _cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
      protected _copyTo(
        that: _cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem
      ): _cocos_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
    }
    export enum _cocos_animation_marionette_animation_blend_2d__Algorithm {
      SIMPLE_DIRECTIONAL = 0,
      FREEFORM_CARTESIAN = 1,
      FREEFORM_DIRECTIONAL = 2,
    }
    export class _cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem extends _cocos_animation_marionette_animation_blend__AnimationBlendItem {
      threshold: math.Vec2;
      clone(): _cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
      protected _copyTo(
        that: _cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem
      ): _cocos_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
    }
    export interface _cocos_animation_marionette_parametric__Bindable<TValue> {
      value: TValue;
      variable: string;
      clone(): _cocos_animation_marionette_parametric__Bindable<TValue>;
    }
    export interface _cocos_animation_marionette_animation_mask__JointMaskInfo {
      readonly path: string;
      enabled: boolean;
    }
    export type _cocos_animation_marionette_animation_mask__JointMaskInfo_ =
      _cocos_animation_marionette_animation_mask__JointMaskInfo;
    export class _cocos_animation_marionette_animation_graph_variant__ClipOverrideEntry {
      original: AnimationClip;
      substitution: AnimationClip;
    }
    export class _cocos_animation_marionette_animation_graph_variant__ClipOverrideMap
      implements
        _cocos_animation_marionette_graph_eval__ReadonlyClipOverrideMap
    {
      get size(): number;
      [Symbol.iterator](): IterableIterator<_cocos_animation_marionette_animation_graph_variant__ClipOverrideEntry>;
      has(original: AnimationClip): boolean;
      get(original: AnimationClip): AnimationClip | undefined;
      set(original: AnimationClip, substitution: AnimationClip): void;
      delete(original: AnimationClip): void;
      clear(): void;
    }
  }
  import {
    math,
    animation,
    Node,
    __private as ___private,
    AnimationClip,
    Asset,
  } from "cc";
  import { __private as ____private } from "cc/editor/new-gen-anim";
  export {};
}
declare module "cc/editor/offline-mappings" {
  export const effectStructure: {
    $techniques: {
      $passes: {
        depthStencilState: {};
        rasterizerState: {};
        blendState: {
          targets: {}[];
        };
        properties: {
          any: {
            sampler: {};
            editor: {};
          };
        };
        migrations: {
          properties: {
            any: {};
          };
          macros: {
            any: {};
          };
        };
        embeddedMacros: {};
      }[];
    }[];
  };
  export const isSampler: (type: any) => boolean;
  export const typeMap: Record<string, gfx.Type | string>;
  export const formatMap: {
    bool: gfx.Format;
    bvec2: gfx.Format;
    bvec3: gfx.Format;
    bvec4: gfx.Format;
    int: gfx.Format;
    ivec2: gfx.Format;
    ivec3: gfx.Format;
    ivec4: gfx.Format;
    uint: gfx.Format;
    uvec2: gfx.Format;
    uvec3: gfx.Format;
    uvec4: gfx.Format;
    float: gfx.Format;
    vec2: gfx.Format;
    vec3: gfx.Format;
    vec4: gfx.Format;
    int8_t: gfx.Format;
    i8vec2: gfx.Format;
    i8vec3: gfx.Format;
    i8vec4: gfx.Format;
    uint8_t: gfx.Format;
    u8vec2: gfx.Format;
    u8vec3: gfx.Format;
    u8vec4: gfx.Format;
    int16_t: gfx.Format;
    i16vec2: gfx.Format;
    i16vec3: gfx.Format;
    i16vec4: gfx.Format;
    uint16_t: gfx.Format;
    u16vec2: gfx.Format;
    u16vec3: gfx.Format;
    u16vec4: gfx.Format;
    float16_t: gfx.Format;
    f16vec2: gfx.Format;
    f16vec3: gfx.Format;
    f16vec4: gfx.Format;
    mat2: gfx.Format;
    mat3: gfx.Format;
    mat4: gfx.Format;
    mat2x2: gfx.Format;
    mat3x3: gfx.Format;
    mat4x4: gfx.Format;
    mat2x3: gfx.Format;
    mat2x4: gfx.Format;
    mat3x2: gfx.Format;
    mat3x4: gfx.Format;
    mat4x2: gfx.Format;
    mat4x3: gfx.Format;
  };
  export const getFormat: (name: string) => any;
  export const getShaderStage: (name: string) => any;
  export const getDescriptorType: (name: string) => any;
  export const isNormalized: (format: string) => boolean;
  export const isPaddedMatrix: (type: any) => boolean;
  export const getMemoryAccessFlag: (access: string) => gfx.MemoryAccessBit;
  export const passParams: {
    NONE: gfx.ColorMask;
    R: gfx.ColorMask;
    G: gfx.ColorMask;
    B: gfx.ColorMask;
    A: gfx.ColorMask;
    RG: number;
    RB: number;
    RA: number;
    GB: number;
    GA: number;
    BA: number;
    RGB: number;
    RGA: number;
    RBA: number;
    GBA: number;
    ALL: gfx.ColorMask;
    ADD: gfx.BlendOp;
    SUB: gfx.BlendOp;
    REV_SUB: gfx.BlendOp;
    MIN: gfx.BlendOp;
    MAX: gfx.BlendOp;
    ZERO: gfx.BlendFactor;
    ONE: gfx.BlendFactor;
    SRC_ALPHA: gfx.BlendFactor;
    DST_ALPHA: gfx.BlendFactor;
    ONE_MINUS_SRC_ALPHA: gfx.BlendFactor;
    ONE_MINUS_DST_ALPHA: gfx.BlendFactor;
    SRC_COLOR: gfx.BlendFactor;
    DST_COLOR: gfx.BlendFactor;
    ONE_MINUS_SRC_COLOR: gfx.BlendFactor;
    ONE_MINUS_DST_COLOR: gfx.BlendFactor;
    SRC_ALPHA_SATURATE: gfx.BlendFactor;
    CONSTANT_COLOR: gfx.BlendFactor;
    ONE_MINUS_CONSTANT_COLOR: gfx.BlendFactor;
    CONSTANT_ALPHA: gfx.BlendFactor;
    ONE_MINUS_CONSTANT_ALPHA: gfx.BlendFactor;
    KEEP: gfx.StencilOp;
    REPLACE: gfx.StencilOp;
    INCR: gfx.StencilOp;
    DECR: gfx.StencilOp;
    INVERT: gfx.StencilOp;
    INCR_WRAP: gfx.StencilOp;
    DECR_WRAP: gfx.StencilOp;
    NEVER: gfx.ComparisonFunc;
    LESS: gfx.ComparisonFunc;
    EQUAL: gfx.ComparisonFunc;
    LESS_EQUAL: gfx.ComparisonFunc;
    GREATER: gfx.ComparisonFunc;
    NOT_EQUAL: gfx.ComparisonFunc;
    GREATER_EQUAL: gfx.ComparisonFunc;
    ALWAYS: gfx.ComparisonFunc;
    FRONT: gfx.CullMode;
    BACK: gfx.CullMode;
    GOURAND: gfx.ShadeModel;
    FLAT: gfx.ShadeModel;
    FILL: gfx.PolygonMode;
    LINE: gfx.PolygonMode;
    POINT: gfx.PolygonMode;
    POINT_LIST: gfx.PrimitiveMode;
    LINE_LIST: gfx.PrimitiveMode;
    LINE_STRIP: gfx.PrimitiveMode;
    LINE_LOOP: gfx.PrimitiveMode;
    TRIANGLE_LIST: gfx.PrimitiveMode;
    TRIANGLE_STRIP: gfx.PrimitiveMode;
    TRIANGLE_FAN: gfx.PrimitiveMode;
    LINE_LIST_ADJACENCY: gfx.PrimitiveMode;
    LINE_STRIP_ADJACENCY: gfx.PrimitiveMode;
    TRIANGLE_LIST_ADJACENCY: gfx.PrimitiveMode;
    TRIANGLE_STRIP_ADJACENCY: gfx.PrimitiveMode;
    TRIANGLE_PATCH_ADJACENCY: gfx.PrimitiveMode;
    QUAD_PATCH_LIST: gfx.PrimitiveMode;
    ISO_LINE_LIST: gfx.PrimitiveMode;
    LINEAR: gfx.Filter;
    ANISOTROPIC: gfx.Filter;
    WRAP: gfx.Address;
    MIRROR: gfx.Address;
    CLAMP: gfx.Address;
    BORDER: gfx.Address;
    LINE_WIDTH: gfx.DynamicStateFlagBit;
    DEPTH_BIAS: gfx.DynamicStateFlagBit;
    BLEND_CONSTANTS: gfx.DynamicStateFlagBit;
    DEPTH_BOUNDS: gfx.DynamicStateFlagBit;
    STENCIL_WRITE_MASK: gfx.DynamicStateFlagBit;
    STENCIL_COMPARE_MASK: gfx.DynamicStateFlagBit;
    TRUE: boolean;
    FALSE: boolean;
  };
  export import Sampler = gfx.Sampler;
  export import SamplerInfo = gfx.SamplerInfo;
  export import SetIndex = pipeline.SetIndex;
  export import RenderPriority = pipeline.RenderPriority;
  export import GetTypeSize = gfx.GetTypeSize;
  export { murmurhash2_32_gc } from "cc";
  import { gfx, pipeline } from "cc";
  export {};
}
declare module "cc/editor/particle-system-2d-utils" {
  /**
   * A png file reader
   * @name PNGReader
   */
  export class PNGReader {
    constructor(data: any);
    read(bytes: any): any[];
    readUInt32(): number;
    readUInt16(): number;
    decodePixels(data: any): Uint8Array;
    copyToImageData(imageData: any, pixels: any): void;
    decodePalette(): Uint8Array;
    render(canvas: any): any;
  }
  /**
   * cc.tiffReader is a singleton object, it's a tiff file reader, it can parse byte array to draw into a canvas
   * @class
   * @name tiffReader
   */
  export class TiffReader {
    constructor();
    getUint8(offset: any): never;
    getUint16(offset: any): number;
    getUint32(offset: any): number;
    checkLittleEndian(): boolean;
    hasTowel(): boolean;
    getFieldTypeName(fieldType: any): any;
    getFieldTagName(fieldTag: any): any;
    getFieldTypeLength(fieldTypeName: any): 1 | 0 | 4 | 2 | 8;
    getFieldValues(
      fieldTagName: any,
      fieldTypeName: any,
      typeCount: any,
      valueOffset: any
    ): any[];
    getBytes(numBytes: any, offset: any): number;
    getBits(
      numBits: any,
      byteOffset: any,
      bitOffset: any
    ): {
      bits: number;
      byteOffset: any;
      bitOffset: number;
    };
    parseFileDirectory(offset: any): void;
    clampColorSample(colorSample: any, bitsPerSample: any): number;
    /**
     * @function
     * @param {Array} tiffData
     * @param {HTMLCanvasElement} canvas
     * @returns {*}
     */
    parseTIFF(tiffData: any, canvas: any): any;
  }
  export function getImageFormatByData(
    imgData: any
  ): ImageFormat.PNG | ImageFormat.TIFF | ImageFormat.UNKNOWN;
  /**
   * Image formats
   * @enum macro.ImageFormat
   */
  export enum ImageFormat {
    /**
     * @en Image Format:JPG
     * @zh 图片格式:JPG
     */
    JPG = 0,
    /**
     * @en Image Format:PNG
     * @zh 图片格式:PNG
     */
    PNG = 1,
    /**
     * @en Image Format:TIFF
     * @zh 图片格式:TIFF
     */
    TIFF = 2,
    /**
     * @en Image Format:WEBP
     * @zh 图片格式:WEBP
     */
    WEBP = 3,
    /**
     * @en Image Format:PVR
     * @zh 图片格式:PVR
     */
    PVR = 4,
    /**
     * @en Image Format:ETC
     * @zh 图片格式:ETC
     */
    ETC = 5,
    /**
     * @en Image Format:S3TC
     * @zh 图片格式:S3TC
     */
    S3TC = 6,
    /**
     * @en Image Format:ATITC
     * @zh 图片格式:ATITC
     */
    ATITC = 7,
    /**
     * @en Image Format:TGA
     * @zh 图片格式:TGA
     */
    TGA = 8,
    /**
     * @en Image Format:RAWDATA
     * @zh 图片格式:RAWDATA
     */
    RAWDATA = 9,
    /**
     * @en Image Format:UNKNOWN
     * @zh 图片格式:UNKNOWN
     */
    UNKNOWN = 10,
  }
  export {};
}
declare module "cc/editor/populate-internal-constants" {
  /**
   * Running in Web platform
   */
  export const HTML5: boolean;
  /**
   * Running in native platform (mobile app, desktop app, or simulator).
   */
  export const NATIVE: boolean;
  /**
   * Running in the Wechat's mini game.
   */
  export const WECHAT: boolean;
  /**
   * Running in the baidu's mini game.
   */
  export const BAIDU: boolean;
  /**
   * Running in the xiaomi's quick game.
   */
  export const XIAOMI: boolean;
  /**
   * Running in the alipay's mini game.
   */
  export const ALIPAY: boolean;
  /**
   * Running in the taobao creative app.
   */
  export const TAOBAO: boolean;
  /**
   * Running in the ByteDance's mini game.
   */
  export const BYTEDANCE: boolean;
  /**
   * Running in the oppo's quick game.
   */
  export const OPPO: boolean;
  /**
   * Running in the vivo's quick game.
   */
  export const VIVO: boolean;
  /**
   * Running in the huawei's quick game.
   */
  export const HUAWEI: boolean;
  /**
   * Running in the cocosplay.
   */
  export const COCOSPLAY: boolean;
  /**
   * Running in the qtt's quick game.
   */
  export const QTT: boolean;
  /**
   * Running in the linksure's quick game.
   */
  export const LINKSURE: boolean;
  /**
   * Running in the editor.
   */
  export const EDITOR: boolean;
  /**
   * Preview in browser or simulator.
   */
  export const PREVIEW: boolean;
  /**
   * Running in published project.
   */
  export const BUILD: boolean;
  /**
   * Running in the engine's unit test.
   */
  export const TEST: boolean;
  /**
   * Running debug mode.
   */
  export const DEBUG: boolean;
  /**
   * Running in the server mode.
   */
  export const SERVER_MODE: boolean;
  /**
   * Running in the editor or preview.
   */
  export const DEV: boolean;
  /**
   * Running in mini game.
   */
  export const MINIGAME: boolean;
  /**
   * Running in runtime based environment.
   */
  export const RUNTIME_BASED: boolean;
  /**
   * Support JIT.
   */
  export const SUPPORT_JIT: boolean;
  /**
   * Running in environment where using JSB as the JavaScript interface binding scheme.
   */
  export const JSB: boolean;
  /**
   * This is an internal constant to determine whether pack physx libs.
   */
  export const NOT_PACK_PHYSX_LIBS: boolean;
  /**
   * The network access mode.
   * - 0 Client
   * - 1 ListenServer
   * - 2 HostServer
   */
  export const NET_MODE: number;
  /**
   * Running with webgpu rendering backend.
   */
  export const WEBGPU: boolean;
  export {};
}
declare module "cc/editor/reflection-probe" {
  export class ReflectionProbeManager {
    static probeManager: ReflectionProbeManager;
    constructor();
    /**
     * @en refresh all reflection probe
     * @zh 刷新所有反射探针
     */
    onUpdateProbes(forceUpdate?: boolean): void;
    filterModelsForPlanarReflection(): void;
    clearPlanarReflectionMap(probe: renderer.scene.ReflectionProbe): void;
    register(probe: renderer.scene.ReflectionProbe): void;
    unregister(probe: renderer.scene.ReflectionProbe): void;
    exists(probeId: number): boolean;
    getNewReflectionProbeId(): number;
    getProbes(): renderer.scene.ReflectionProbe[];
    clearAll(): void;
    getProbeByCamera(
      camera: renderer.scene.Camera
    ): renderer.scene.ReflectionProbe | null;
    /**
     * @en Update the cubemap captured by the reflection probe.
     * @zh 更新反射探针捕获的cubemap
     * @param probe update the texture for this probe
     */
    updateBakedCubemap(probe: renderer.scene.ReflectionProbe): void;
    /**
     * @en Update the plane reflection map for reflection probe render.
     * @zh 更新反射探针渲染的平面反射贴图
     * @param probe update the texture for this probe
     */
    updatePlanarMap(
      probe: renderer.scene.ReflectionProbe,
      texture: gfx.Texture | null
    ): void;
    /**
     * @en Update the preview sphere of the Reflection Probe cube mode.
     * @zh 更新反射探针cube模式的预览球
     */
    updatePreviewSphere(probe: renderer.scene.ReflectionProbe): void;
    /**
     * @en Update the preview plane of the Reflection Probe planar mode.
     * @zh 更新反射探针预览平面
     */
    updatePreviewPlane(probe: renderer.scene.ReflectionProbe): void;
  }
  import { renderer, gfx } from "cc";
  export {};
}
declare module "cc/editor/serialization" {
  export class CCON {
    constructor(document: unknown, chunks: Uint8Array[]);
    get document(): unknown;
    get chunks(): Uint8Array[];
  }
  export function encodeCCONJson(ccon: CCON, chunkURLs: string[]): unknown;
  export function encodeCCONBinary(ccon: CCON): Uint8Array;
  export class BufferBuilder {
    get byteLength(): number;
    alignAs(align: number): number;
    append(view: ArrayBufferView): number;
    get(): Uint8Array;
  }
  export function decodeCCONBinary(bytes: Uint8Array): CCON;
  export function parseCCONJson(json: unknown): {
    chunks: string[];
    document: unknown;
  };
  export {};
}

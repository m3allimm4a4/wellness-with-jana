import { Component, inject, OnInit, signal } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  ClassicEditor,
  CloudServices,
  EditorConfig,
  Essentials,
  FindAndReplace,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from 'ckeditor5';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, iif, of, switchMap, tap } from 'rxjs';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '../../../shared/interfaces/blog.interface';
import { BlogApiService } from '../../../shared/services/blog-api.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-admin-blogs-details',
  imports: [CKEditorModule, Card, InputText, MultiSelect, ReactiveFormsModule, Button],
  templateUrl: './admin-blogs-details.component.html',
  styleUrl: './admin-blogs-details.component.scss',
})
export class AdminBlogsDetailsComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly blogApiService = inject(BlogApiService);

  protected readonly Editor = ClassicEditor;
  protected readonly config: EditorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      SimpleUploadAdapter,
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      FindAndReplace,
      Heading,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },
    simpleUpload: {
      uploadUrl: '',
      headers: {},
    },
    initialData: '',
    licenseKey: 'GPL',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
    },
    autosave: {
      save: editor => this.onBlogContentSave(editor.getData()),
    },
  };
  protected readonly blogForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    tag: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
    related: new FormControl<string[]>([], [Validators.required]),
  });
  protected readonly content = signal<string>('');
  protected readonly blog = signal<Blog | undefined>(undefined);

  ngOnInit() {
    this.authService.getAccessToken().subscribe(accessToken => {
      if (this.config.simpleUpload) {
        this.config.simpleUpload.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
    });
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id || id === 'new') {
            return of(undefined);
          }
          if (this.config.simpleUpload) {
            this.config.simpleUpload.uploadUrl = this.blogApiService.getContentImageUploadUrl(id);
          }

          return this.blogApiService.getBlogById(id);
        }),
        tap(blog => {
          if (!blog) return;

          this.blogForm.patchValue({
            related: blog.related?.map(b => (typeof b === 'string' ? b : b.id || '')),
            title: blog.title,
            tag: blog.tag,
            author: blog.author,
          });
          this.blog.set(blog);
          this.content.set(blog.content || '');
        }),
      )
      .subscribe();
  }

  onBlogInfoSave() {
    const blog: Blog = {
      title: this.blogForm.controls.title.value || '',
      tag: this.blogForm.controls.tag.value || '',
      author: this.blogForm.controls.author.value || '',
      related: this.blogForm.controls.related.value || [],
    };
    iif(() => !!this.blog()?.id, this.blogApiService.updateBlog(blog), this.blogApiService.addBlog(blog)).subscribe(
      blog => this.blog.set(blog),
    );
  }

  async onBlogContentSave(content: string) {
    const blog = await firstValueFrom(this.blogApiService.updateBlogContent(content));
    this.blog.set(blog);
  }
}

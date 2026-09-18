import {
  createTranslationMessages,
  createTranslationRef,
} from '@backstage/frontend-plugin-api';
import { coreComponentsTranslationRef } from '@backstage/core-components/alpha';
import { catalogReactTranslationRef } from '@backstage/plugin-catalog-react';

export const appTranslationRef = createTranslationRef({
  id: 'app',
  messages: {
    sidebar: {
      home: 'Início',
      search: 'Pesquisa',
      menu: 'Menu',
      settings: 'Configurações',
      catalog: 'Catálogo',
      create: 'Criar',
      docs: 'Documentação',
      notifications: 'Notificações',
      visualizer: 'Visualizador',
      registerExisting: 'Registrar Existente…',
      catalogGraph: 'Grafo do Catálogo',
      apis: 'APIs',
    },
  },
});

export const appTranslations = createTranslationMessages({
  ref: appTranslationRef,
  messages: {
    'sidebar.home': 'Início',
    'sidebar.search': 'Pesquisa',
    'sidebar.menu': 'Menu',
    'sidebar.settings': 'Configurações',
    'sidebar.catalog': 'Catálogo',
    'sidebar.create': 'Criar',
    'sidebar.docs': 'Documentação',
    'sidebar.notifications': 'Notificações',
    'sidebar.visualizer': 'Visualizador',
    'sidebar.registerExisting': 'Registrar Existente…',
    'sidebar.catalogGraph': 'Grafo do Catálogo',
    'sidebar.apis': 'APIs',
  },
});

export const catalogTranslationRef = createTranslationRef({
  id: 'catalog',
  messages: {
    indexPage: {
      title: '{{orgName}} Catálogo',
      createButtonTitle: 'Criar',
      supportButtonContent: 'Todos os seus componentes do catálogo de software',
    },
    aboutCard: {
      title: 'Sobre',
      refreshButtonTitle: 'Agendar atualização da entidade',
      editButtonTitle: 'Editar metadados',
      editButtonAriaLabel: 'Editar',
      createSimilarButtonTitle: 'Criar algo semelhante',
      refreshScheduledMessage: 'Atualização agendada',
      refreshButtonAriaLabel: 'Atualizar',
      launchTemplate: 'Iniciar modelo',
      viewTechdocs: 'Ver TechDocs',
      viewSource: 'Ver código-fonte',
      unknown: 'desconhecido',
      descriptionField: {
        label: 'Descrição',
        value: 'Sem descrição',
      },
      ownerField: {
        label: 'Responsável',
        value: 'Sem responsável',
      },
      domainField: {
        label: 'Domínio',
        value: 'Sem domínio',
      },
      systemField: {
        label: 'Sistema',
        value: 'Sem sistema',
      },
      parentComponentField: {
        label: 'Componente pai',
        value: 'Sem componente pai',
      },
      kindField: {
        label: 'Tipo',
      },
      typeField: {
        label: 'Tipo',
      },
      lifecycleField: {
        label: 'Ciclo de Vida',
      },
      tagsField: {
        label: 'Etiquetas',
        value: 'Sem etiquetas',
      },
      targetsField: {
        label: 'Alvos',
      },
    },
    searchResultItem: {
      kind: 'Tipo',
      type: 'Tipo',
      lifecycle: 'Ciclo de Vida',
      owner: 'Responsável',
    },
    catalogTable: {
      warningPanelTitle: 'Não foi possível buscar entidades do catálogo.',
      viewActionTitle: 'Visualizar',
      editActionTitle: 'Editar',
      starActionTitle: 'Adicionar aos favoritos',
      unStarActionTitle: 'Remover dos favoritos',
      allFilters: 'Todos',
    },
    dependencyOfComponentsCard: {
      title: 'Dependência de componentes',
      emptyMessage: 'Nenhum componente depende deste componente.',
    },
    dependsOnComponentsCard: {
      title: 'Depende de componentes',
      emptyMessage: 'Nenhum componente é dependência deste componente.',
    },
    dependsOnResourcesCard: {
      title: 'Depende de recursos',
      emptyMessage: 'Nenhum recurso é dependência deste componente.',
    },
    entityLabelsCard: {
      title: 'Etiquetas',
      columnKeyLabel: 'Etiqueta',
      columnValueLabel: 'Valor',
      emptyDescription:
        'Nenhuma etiqueta definida para esta entidade. Você pode adicionar etiquetas ao YAML da sua entidade como mostrado no exemplo destacado abaixo:',
      readMoreButtonTitle: 'Saiba mais',
    },
    entityLinksCard: {
      title: 'Links',
      emptyDescription:
        'Nenhum link definido para esta entidade. Você pode adicionar links ao YAML da sua entidade como mostrado no exemplo destacado abaixo:',
      readMoreButtonTitle: 'Saiba mais',
    },
    hasComponentsCard: {
      title: 'Possui componentes',
      emptyMessage: 'Nenhum componente faz parte deste sistema.',
    },
    hasResourcesCard: {
      title: 'Possui recursos',
      emptyMessage: 'Nenhum recurso faz parte deste sistema.',
    },
    hasSubcomponentsCard: {
      title: 'Possui subcomponentes',
      emptyMessage: 'Nenhum subcomponente faz parte deste componente.',
    },
    hasSubdomainsCard: {
      title: 'Possui subdomínios',
      emptyMessage: 'Nenhum subdomínio faz parte deste domínio.',
    },
    hasSystemsCard: {
      title: 'Possui sistemas',
      emptyMessage: 'Nenhum sistema faz parte deste domínio.',
    },
    systemDiagramCard: {
      title: 'Diagrama do sistema',
      description: 'Use gesto de toque e zoom para navegar pelo diagrama.',
      edgeLabels: {
        partOf: 'parte de',
        provides: 'fornece',
        dependsOn: 'depende de',
      },
    },
  },
});

export const catalogTranslations = createTranslationMessages({
  ref: catalogTranslationRef,
  messages: {
    'indexPage.title': '{{orgName}} Catálogo',
    'indexPage.createButtonTitle': 'Criar',
    'indexPage.supportButtonContent':
      'Todos os seus componentes do catálogo de software',
    'aboutCard.title': 'Sobre',
    'aboutCard.refreshButtonTitle': 'Agendar atualização da entidade',
    'aboutCard.editButtonTitle': 'Editar metadados',
    'aboutCard.editButtonAriaLabel': 'Editar',
    'aboutCard.createSimilarButtonTitle': 'Criar algo semelhante',
    'aboutCard.refreshScheduledMessage': 'Atualização agendada',
    'aboutCard.refreshButtonAriaLabel': 'Atualizar',
    'aboutCard.launchTemplate': 'Iniciar modelo',
    'aboutCard.viewTechdocs': 'Ver TechDocs',
    'aboutCard.viewSource': 'Ver código-fonte',
    'aboutCard.unknown': 'desconhecido',
    'aboutCard.descriptionField.label': 'Descrição',
    'aboutCard.descriptionField.value': 'Sem descrição',
    'aboutCard.ownerField.label': 'Responsável',
    'aboutCard.ownerField.value': 'Sem responsável',
    'aboutCard.domainField.label': 'Domínio',
    'aboutCard.domainField.value': 'Sem domínio',
    'aboutCard.systemField.label': 'Sistema',
    'aboutCard.systemField.value': 'Sem sistema',
    'aboutCard.parentComponentField.label': 'Componente pai',
    'aboutCard.parentComponentField.value': 'Sem componente pai',
    'aboutCard.kindField.label': 'Tipo',
    'aboutCard.typeField.label': 'Tipo',
    'aboutCard.lifecycleField.label': 'Ciclo de Vida',
    'aboutCard.tagsField.label': 'Etiquetas',
    'aboutCard.tagsField.value': 'Sem etiquetas',
    'aboutCard.targetsField.label': 'Alvos',
    'searchResultItem.kind': 'Tipo',
    'searchResultItem.type': 'Tipo',
    'searchResultItem.lifecycle': 'Ciclo de Vida',
    'searchResultItem.owner': 'Responsável',
    'catalogTable.warningPanelTitle':
      'Não foi possível buscar entidades do catálogo.',
    'catalogTable.viewActionTitle': 'Visualizar',
    'catalogTable.editActionTitle': 'Editar',
    'catalogTable.starActionTitle': 'Adicionar aos favoritos',
    'catalogTable.unStarActionTitle': 'Remover dos favoritos',
    'catalogTable.allFilters': 'Todos',
    'dependencyOfComponentsCard.title': 'Dependência de componentes',
    'dependencyOfComponentsCard.emptyMessage':
      'Nenhum componente depende deste componente.',
    'dependsOnComponentsCard.title': 'Depende de componentes',
    'dependsOnComponentsCard.emptyMessage':
      'Nenhum componente é dependência deste componente.',
    'dependsOnResourcesCard.title': 'Depende de recursos',
    'dependsOnResourcesCard.emptyMessage':
      'Nenhum recurso é dependência deste componente.',
    'entityLabelsCard.title': 'Etiquetas',
    'entityLabelsCard.columnKeyLabel': 'Etiqueta',
    'entityLabelsCard.columnValueLabel': 'Valor',
    'entityLabelsCard.emptyDescription':
      'Nenhuma etiqueta definida para esta entidade. Você pode adicionar etiquetas ao YAML da sua entidade como mostrado no exemplo destacado abaixo:',
    'entityLabelsCard.readMoreButtonTitle': 'Saiba mais',
    'entityLinksCard.title': 'Links',
    'entityLinksCard.emptyDescription':
      'Nenhum link definido para esta entidade. Você pode adicionar links ao YAML da sua entidade como mostrado no exemplo destacado abaixo:',
    'entityLinksCard.readMoreButtonTitle': 'Saiba mais',
    'hasComponentsCard.title': 'Possui componentes',
    'hasComponentsCard.emptyMessage':
      'Nenhum componente faz parte deste sistema.',
    'hasResourcesCard.title': 'Possui recursos',
    'hasResourcesCard.emptyMessage': 'Nenhum recurso faz parte deste sistema.',
    'hasSubcomponentsCard.title': 'Possui subcomponentes',
    'hasSubcomponentsCard.emptyMessage':
      'Nenhum subcomponente faz parte deste componente.',
    'hasSubdomainsCard.title': 'Possui subdomínios',
    'hasSubdomainsCard.emptyMessage':
      'Nenhum subdomínio faz parte deste domínio.',
    'hasSystemsCard.title': 'Possui sistemas',
    'hasSystemsCard.emptyMessage': 'Nenhum sistema faz parte deste domínio.',
    'systemDiagramCard.title': 'Diagrama do sistema',
    'systemDiagramCard.description':
      'Use gesto de toque e zoom para navegar pelo diagrama.',
    'systemDiagramCard.edgeLabels.partOf': 'parte de',
    'systemDiagramCard.edgeLabels.provides': 'fornece',
    'systemDiagramCard.edgeLabels.dependsOn': 'depende de',
  },
});

export const catalogReactTranslations = createTranslationMessages({
  ref: catalogReactTranslationRef,
  messages: {
    'catalogFilter.title': 'Filtros',
    'catalogFilter.buttonTitle': 'Filtros',
    'entityKindPicker.title': 'Tipo',
    'entityKindPicker.errorMessage': 'Falha ao carregar tipos de entidade',
    'entityLifecyclePicker.title': 'Ciclo de Vida',
    'entityNamespacePicker.title': 'Namespace',
    'entityOwnerPicker.title': 'Responsável',
    'entityProcessingStatusPicker.title': 'Status de processamento',
    'entityTagPicker.title': 'Etiquetas',
    'entitySearchBar.placeholder': 'Pesquisar',
    'entityTypePicker.title': 'Tipo',
    'entityTypePicker.errorMessage': 'Falha ao carregar tipos de entidade',
    'entityTypePicker.optionAllTitle': 'Todos os componentes',
    'favoriteEntity.addToFavorites': 'Adicionar aos favoritos',
    'favoriteEntity.removeFromFavorites': 'Remover dos favoritos',
    'userListPicker.defaultOrgName': 'Empresa',
    'userListPicker.personalFilter.title': 'Pessoal',
    'userListPicker.personalFilter.ownedLabel': 'Responsável',
    'userListPicker.personalFilter.starredLabel': 'Favoritos',
    'userListPicker.orgFilterAllLabel': 'Todos',
    'entityTableColumnTitle.name': 'Nome',
    'entityTableColumnTitle.system': 'Sistema',
    'entityTableColumnTitle.owner': 'Responsável',
    'entityTableColumnTitle.type': 'Tipo',
    'entityTableColumnTitle.lifecycle': 'Ciclo de Vida',
    'entityTableColumnTitle.namespace': 'Namespace',
    'entityTableColumnTitle.description': 'Descrição',
    'entityTableColumnTitle.tags': 'Etiquetas',
    'entityTableColumnTitle.targets': 'Alvos',
    'entityTableColumnTitle.title': 'Título',
    'entityTableColumnTitle.label': 'Rótulo',
    'entityTableColumnTitle.domain': 'Domínio',
  },
});

export const coreComponentsTranslations = createTranslationMessages({
  ref: coreComponentsTranslationRef,
  messages: {
    'signIn.title': 'Entrar',
    'signIn.loginFailed': 'Falha ao entrar',
    'signIn.customProvider.title': 'Usuário personalizado',
    'signIn.customProvider.subtitle':
      'Digite seu próprio ID de usuário e credenciais.\n Esta seleção não será armazenada.',
    'signIn.customProvider.userId': 'ID do usuário',
    'signIn.customProvider.tokenInvalid':
      'O token não é um JWT OpenID Connect válido',
    'signIn.customProvider.continue': 'Continuar',
    'signIn.customProvider.idToken': 'ID Token (opcional)',
    'signIn.guestProvider.title': 'Convidado',
    'signIn.guestProvider.subtitle':
      'Entre como usuário convidado.\n Você não terá uma identidade verificada, portanto algumas funcionalidades podem ficar indisponíveis.',
    'signIn.guestProvider.enter': 'Entrar',
    skipToContent: 'Pular para o conteúdo',
    'copyTextButton.tooltipText': 'Texto copiado para a área de transferência',
    'simpleStepper.reset': 'Reiniciar',
    'simpleStepper.finish': 'Concluir',
    'simpleStepper.next': 'Próximo',
    'simpleStepper.skip': 'Pular',
    'simpleStepper.back': 'Voltar',
    'errorPage.subtitle': 'ERRO {{status}}: {{statusMessage}}',
    'errorPage.title': 'Parece que alguém deixou o microfone cair!',
    'errorPage.goBack': 'Voltar',
    'errorPage.showMoreDetails': 'Mostrar mais detalhes',
    'errorPage.showLessDetails': 'Mostrar menos detalhes',
    'emptyState.missingAnnotation.title': 'Anotação ausente',
    'emptyState.missingAnnotation.actionTitle':
      'Adicione a anotação ao YAML do seu componente conforme mostrado no exemplo destacado abaixo:',
    'emptyState.missingAnnotation.readMore': 'Saiba mais',
    'supportConfig.default.title': 'Suporte não configurado',
    'supportConfig.default.linkTitle': 'Adicionar a chave app.support',
    'errorBoundary.title':
      'Entre em contato com {{slackChannel}} para obter ajuda.',
    'oauthRequestDialog.title': 'Login necessário',
    'oauthRequestDialog.authRedirectTitle':
      'Isso acionará uma redirecionamento HTTP para o login OAuth.',
    'oauthRequestDialog.login': 'Entrar',
    'oauthRequestDialog.rejectAll': 'Rejeitar tudo',
    'oauthRequestDialog.message':
      'Faça login para permitir que {{appTitle}} acesse as APIs e identidades de {{provider}}.',
    'supportButton.title': 'Suporte',
    'supportButton.close': 'Fechar',
    'table.filter.title': 'Filtros',
    'table.filter.clearAll': 'Limpar tudo',
    'table.filter.placeholder': 'Todos os resultados',
    'table.body.emptyDataSourceMessage': 'Nenhum registro para exibir',
    'table.pagination.firstTooltip': 'Primeira página',
    'table.pagination.labelDisplayedRows': '{from}-{to} de {count}',
    'table.pagination.labelRowsSelect': 'linhas',
    'table.pagination.lastTooltip': 'Última página',
    'table.pagination.nextTooltip': 'Próxima página',
    'table.pagination.previousTooltip': 'Página anterior',
    'table.toolbar.search': 'Filtrar',
    'table.header.actions': 'Ações',
    'alertDisplay.message_one': '({{ count }} mensagem mais recente)',
    'alertDisplay.message_other': '({{ count }} mensagens mais recentes)',
    'autoLogout.stillTherePrompt.title': 'Saindo por inatividade',
    'autoLogout.stillTherePrompt.buttonText': 'Sim! Não me desconecte',
    'dependencyGraph.fullscreenTooltip': 'Alternar tela cheia',
    'proxiedSignInPage.title':
      'Você parece não estar autenticado. Tente recarregar a página do navegador.',
    'logViewer.downloadBtn.tooltip': 'Baixar logs',
    'logViewer.searchField.placeholder': 'Pesquisar',
  },
});
